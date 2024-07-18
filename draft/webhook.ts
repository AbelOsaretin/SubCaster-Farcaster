import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { TCast } from "./types";
import connectDB from "./src/db";
import { UserToSubscribes, SubscribeToUsers } from "./src/models";
import { addSubscribesToWebhook } from "./src/webhook-helper";
import { frameReply, sendDirectCast } from "./src/frameReply-helper";
import { neynarClient } from "./src/config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4343;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server || GET");
});

app.post("/subscribe", async (req: Request, res: Response) => {
  const body: TCast = req.body;

  try {
    if (
      body?.data?.mentioned_profiles &&
      body.data.mentioned_profiles.filter(
        (profile: any) => profile.fid === 792715
      ).length > 0
    ) {
      console.log({
        authorFid: body.data.author.fid,
        parentAuthorFid: body.data.parent_author.fid,
      });

      const {
        author: { fid: authorFid },
        parent_author: { fid: parentAuthorFid },
      } = body.data;

      const parent_author = await neynarClient.fetchBulkUsers([
        parentAuthorFid,
      ]);

      if (parentAuthorFid === authorFid) {
        await frameReply(
          body.data.hash,
          `gm ${body.data.author.username}, you can't subscribe to yourself`
        );
        throw new Error(
          `Webhook ignored: Author and Parent Author are the same,
          ${authorFid},
          ${parentAuthorFid}`
        );
      }

      const userData = await UserToSubscribes.findById(authorFid);
      const subscribesData = await SubscribeToUsers.findById(parentAuthorFid);

      if (userData === null) {
        const userSub = new UserToSubscribes({
          _id: authorFid,
          subscribes: [parentAuthorFid],
        });

        await userSub.save();
        console.log("User subscribed:", authorFid, parentAuthorFid);
      }

      if (subscribesData === null) {
        const subUser = new SubscribeToUsers({
          _id: parentAuthorFid,
          users: [authorFid],
        });

        await subUser.save();
        console.log("User subscribed:", authorFid, parentAuthorFid);
      }

      if (userData?.subscribes.indexOf(parentAuthorFid) === -1) {
        userData?.subscribes.push(parentAuthorFid);
        await userData?.save();

        console.log("User updated:", authorFid, parentAuthorFid);
      }

      if (subscribesData?.users.indexOf(authorFid) === -1) {
        subscribesData?.users.push(authorFid);
        await subscribesData?.save();

        console.log("User updated:", authorFid, parentAuthorFid);
      }

      await addSubscribesToWebhook(parentAuthorFid);

      await frameReply(
        body.data.hash,
        `gm ${body.data.author.username}, You've have subscribed to receive Casts from ${parent_author.users[0].username} to your Direct Casts. Note that all Subscriptions are automatically deleted after 1 day.`
      );

      console.log({ userData, subscribesData });

      console.log({
        message: "Webhook received: ",
      });
    } else {
      throw new Error("Webhook ignored");
    }
  } catch (error) {
    console.error(error);
  }

  res.send("Express + TypeScript Server || POST Subscribe");
});

app.post("/watch", async (req: Request, res: Response) => {
  try {
    const body: TCast = req.body;

    const {
      author: {
        fid: authorFid,
        username: authorUsername,
        display_name: authorDisplayName,
      },
    } = body.data;

    if (authorFid === 792715) {
      throw new Error("Webhook ignored: Author is Bot");
    }

    const subscribesData = await SubscribeToUsers.findById(authorFid);

    if (subscribesData === null) {
      throw new Error("Webhook ignored: Author is not subscribed");
    }

    const { users } = subscribesData;
    const userData = await neynarClient.fetchBulkUsers(users);

    Promise.all(
      users.map((user) => {
        sendDirectCast(
          user,
          `
          GM GM.
          New Cast from ${authorDisplayName}
          https://warpcast.com/${authorUsername}
          https://warpcast.com/${authorUsername}/${body.data.hash.slice(0, 10)}
          `
        );
      })
    ).then(() => {
      console.log({
        message: `Watcher Webhook received from ${authorUsername} and sent:  `,
        users,
      });
    });

    res.send("Express + TypeScript Server || POST Watch");
  } catch (error) {
    console.error(error);
  }
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

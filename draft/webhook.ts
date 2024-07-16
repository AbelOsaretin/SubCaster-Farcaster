import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { TCast } from "./types";
import connectDB from "./src/db";
import { UserToSubscribes, SubscribeToUsers } from "./src/models";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4343;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server || GET");
});

app.post("/", async (req: Request, res: Response) => {
  const body: TCast = req.body;

  try {
    if (
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

      if (parentAuthorFid === authorFid) {
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

  res.send("Express + TypeScript Server || POST");
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

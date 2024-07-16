import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { TCast } from "./types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4343;

const userToSubscribes: Record<number, number[]> = {};
const subscribeToUsers: Record<number, number[]> = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server || GET");
});

app.post("/", (req: Request, res: Response) => {
  const body: TCast = req.body;

  try {
    if (
      body.data.mentioned_profiles.filter(
        (profile: any) => profile.fid === 792715
      ).length > 0
    ) {
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

      if (userToSubscribes[authorFid] === undefined) {
        userToSubscribes[authorFid] = [];
      }

      if (subscribeToUsers[parentAuthorFid] === undefined) {
        subscribeToUsers[parentAuthorFid] = [];
      }

      if (userToSubscribes[authorFid].indexOf(parentAuthorFid) === -1) {
        userToSubscribes[authorFid].push(parentAuthorFid);
      }

      if (subscribeToUsers[parentAuthorFid].indexOf(authorFid) === -1) {
        subscribeToUsers[parentAuthorFid].push(authorFid);
      }

      console.log({
        message: "Webhook received: ",
        userToSubscribes,
        subscribeToUsers,
      });
    } else {
      throw new Error("Webhook ignored");
    }
  } catch (error) {
    console.error(error);
  }

  res.send("Express + TypeScript Server || POST");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { CastType } from "@neynar/nodejs-sdk/build/neynar-api/v1";
import * as dotenv from "dotenv";
dotenv.config();

let allNotifications: {
  type: CastType | undefined;
  timestamp: string;
  authorFid: string | number;
  parentAuthorFid: string | null;
}[] = [];

// make sure to set your NEYNAR_API_KEY in .env
const client = new NeynarAPIClient(process.env.Neynar_Api_Key!);

// fetch info about a Farcaster user
const fid = 671935;

async function fetchUserMentions() {
  try {
    const user = await client.fetchMentionAndReplyNotifications(fid);
    const notifications = user.result.notifications;

    const filteredNotifications = notifications
      .filter((notification) => notification.type === "cast-mention")
      .map((notification) => {
        return {
          type: notification.type,
          timestamp: notification.timestamp,
          authorFid: notification.author.fid,
          parentAuthorFid: notification.parentAuthor.fid,
        };
      });

    const newNotification = filteredNotifications; // Display filtered results as JSON with indentation
    if (newNotification.length > allNotifications.length) {
      allNotifications = newNotification;

      console.log("New notification:", newNotification);
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

export function startPolling() {
  void fetchUserMentions();
  setInterval(() => fetchUserMentions(), 10 * 1000);
}

startPolling();

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import * as dotenv from "dotenv";
dotenv.config();

// make sure to set your NEYNAR_API_KEY in .env
const client = new NeynarAPIClient("NEYNAR_API_DOCS");

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

    console.log(JSON.stringify(filteredNotifications, null, 2)); // Display filtered results as JSON with indentation
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

export function startPolling() {
  void fetchUserMentions();
  setInterval(() => fetchUserMentions(), 10 * 1000);
}

startPolling();

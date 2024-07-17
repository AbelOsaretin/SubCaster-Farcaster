import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { configDotenv } from "dotenv";
configDotenv();

const client = new NeynarAPIClient(process.env.Neynar_Api_Key!);
const watcherWebhookId = process.env.WATCHER_WEBHOOK_ID!;
const watcherWebhookName = "watcher";
const watcherWebhookUrl = process.env.WATCHER_WEBHOOK_URL!;

export const addSubscribesToWebhook = async (fid: number) => {
  try {
    const data = await client.lookupWebhook(watcherWebhookId);

    const oldSubscribes: number[] =
      data.webhook?.subscription?.filters["cast.created"]?.author_fids || [];

    if (!oldSubscribes.includes(fid)) {
      oldSubscribes.push(fid);
      await client.updateWebhook(
        watcherWebhookId,
        watcherWebhookName,
        watcherWebhookUrl,
        {
          subscription: {
            "cast.created": {
              author_fids: oldSubscribes,
            },
          },
        }
      );

      console.log("Subscribes added to webhook:", fid);
    } else {
      console.log("Subscribes already added to webhook:", fid);
    }
  } catch (error) {
    console.error("Error adding subscribes to webhook:", error);
  }
};

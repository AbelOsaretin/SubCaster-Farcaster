import {
  neynarClient,
  watcherWebhookId,
  watcherWebhookName,
  watcherWebhookUrl,
} from "./config";

export const addSubscribesToWebhook = async (fid: number) => {
  try {
    const data = await neynarClient.lookupWebhook(watcherWebhookId);

    const oldSubscribes: number[] =
      data.webhook?.subscription?.filters["cast.created"]?.author_fids || [];

    if (!oldSubscribes.includes(fid)) {
      oldSubscribes.push(fid);
      await neynarClient.updateWebhook(
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

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

if (!process.env.NEYNAR_API_KEY) {
  throw new Error("Make sure you set NEYNAR_API_KEY in your .env file");
}

if (!process.env.SIGNER_UUID) {
  throw new Error("Make sure you set SIGNER_UUID in your .env file");
}

export const signerUuid = process.env.SIGNER_UUID!;
export const FARCASTER_BOT_MNEMONIC = process.env.FARCASTER_BOT_MNEMONIC!;
export const watcherWebhookId = process.env.WATCHER_WEBHOOK_ID!;
export const watcherWebhookName = "watcher";
export const watcherWebhookUrl = process.env.WATCHER_WEBHOOK_URL!;
export const WARPCAST_API_KEY = process.env.WARPCAST_API_KEY!;

export const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);

export const warpcastApiClient = axios.create({
  baseURL: "https://api.warpcast.com/v2",
  headers: {
    Authorization: `Bearer ${WARPCAST_API_KEY}`,
    "Content-Type": "application/json",
  },
});

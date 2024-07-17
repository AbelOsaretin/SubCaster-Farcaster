import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { NeynarFrameCreationRequest } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { TCast } from "../types";
import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.NEYNAR_API_KEY) {
  throw new Error("Make sure you set NEYNAR_API_KEY in your .env file");
}

const neynarClient = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

if (!process.env.SIGNER_UUID) {
  throw new Error("Make sure you set SIGNER_UUID in your .env file");
}

// const body = await req.text();
// const hookData = JSON.parse(body);

export const frameReply = async (hookData: TCast) => {
  const creationRequest: NeynarFrameCreationRequest = {
    name: `gm ${hookData.data.author.username}`,
    pages: [
      {
        image: {
          url: "https://moralis.io/wp-content/uploads/web3wiki/638-gm/637aeda23eca28502f6d3eae_61QOyzDqTfxekyfVuvH7dO5qeRpU50X-Hs46PiZFReI.jpeg",
          aspect_ratio: "1:1",
        },
        title: "Hello World",
        buttons: [],
        input: {
          text: {
            enabled: false,
          },
        },
        uuid: "Hello",
        version: "v0.0.1",
      },
    ],
  };

  const frame = await neynarClient.publishNeynarFrame(creationRequest);

  const reply = await neynarClient.publishCast(
    process.env.SIGNER_UUID,
    `gm ${hookData.data.author.username}`,
    {
      replyTo: hookData.data.hash,
      embeds: [
        {
          url: frame.link,
        },
      ],
    }
  );
  console.log("reply:", reply);
};

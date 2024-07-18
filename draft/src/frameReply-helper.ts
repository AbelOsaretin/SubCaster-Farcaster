import { NeynarFrameCreationRequest } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import { TCast } from "../types";
import { neynarClient, signerUuid, warpcastApiClient } from "./config";
import axios from "axios";

// const body = await req.text();
// const hookData = JSON.parse(body);

export const frameReply = async (replyTo: string, message: string) => {
  // const creationRequest: NeynarFrameCreationRequest = {
  //   name: `gm ${hookData.data.author.username}`,
  //   pages: [
  //     {
  //       image: {
  //         url: "https://moralis.io/wp-content/uploads/web3wiki/638-gm/637aeda23eca28502f6d3eae_61QOyzDqTfxekyfVuvH7dO5qeRpU50X-Hs46PiZFReI.jpeg",
  //         aspect_ratio: "1:1",
  //       },
  //       title: "Hello World",
  //       buttons: [],
  //       input: {
  //         text: {
  //           enabled: false,
  //         },
  //       },
  //       uuid: "Hello",
  //       version: "v0.0.1",
  //     },
  //   ],
  // };

  // const frame = await neynarClient.publishNeynarFrame(creationRequest);

  const reply = await neynarClient.publishCast(signerUuid, message, {
    replyTo,
  });
  console.log("reply:", reply);
};

interface DirectCastRequest {
  recipientFid: number;
  message: string;
  idempotencyKey: string;
}

export const sendDirectCast = async (recipientFid: number, message: string) => {
  try {
    const directCastRequest: DirectCastRequest = {
      recipientFid,
      message,
      idempotencyKey: Math.random().toString(36).substring(7),
    };
    const response = await warpcastApiClient.put(
      "/ext-send-direct-cast",
      directCastRequest
    );

    if (response.status === 200) {
      console.log("Direct Cast sent successfully:", response.data);
    } else {
      console.error(
        "Error sending Direct Cast:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

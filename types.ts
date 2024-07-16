export interface TCast {
  created_at: number;
  type: string;
  data: CastData;
}

interface CastData {
  object: string;
  hash: string;
  thread_hash: string;
  parent_hash: string;
  parent_url: string | null;
  root_parent_url: string | null;
  parent_author: {
    fid: number;
  };
  author: UserData;
  text: string;
  timestamp: string;
  embeds: any[];
  reactions: Reactions;
  replies: {
    count: number;
  };
  channel: {
    object: string;
    id: string;
    name: string;
    image_url: string;
  } | null;
  mentioned_profiles: UserData[];
}

interface UserData {
  object: string;
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: {
    bio: {
      text: string;
      mentioned_profiles?: any[];
    };
  };
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: VerifiedAddresses;
  active_status: string;
  power_badge: boolean;
}

interface Reactions {
  likes_count: number;
  recasts_count: number;
  likes: any[];
  recasts: any[];
}

interface VerifiedAddresses {
  eth_addresses: string[];
  sol_addresses: string[];
}

const exampleCast: TCast = {
  created_at: 1721125619,
  type: "cast.created",
  data: {
    object: "cast",
    hash: "0x2c0e1d57726c5dc60c0a4de1a76ea27d8d773828",
    thread_hash: "0x747eb6a4e1a816c2e53597469129717860251e49",
    parent_hash: "0x747eb6a4e1a816c2e53597469129717860251e49",
    parent_url: null,
    root_parent_url:
      "chain://eip155:1/erc721:0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03",
    parent_author: {
      fid: 763053,
    },
    author: {
      object: "user",
      fid: 763053,
      custody_address: "0xe05270a62fee05ecede351bcacddfe95d0d6335e",
      username: "abelosaretin.eth",
      display_name: "Abel Osaretin ",
      pfp_url:
        "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/ea6c0a89-07b8-46b6-1c26-4a24cac8c500/rectcrop3",
      profile: {
        bio: {
          text: "Smart contract developer, currently learning Frontend Development.",
        },
      },
      follower_count: 21,
      following_count: 81,
      verifications: [
        "0xf7c371ea75f648cc3070b3f538e0bd68359fedc2",
        "0x4931b524640bcaeb2c94bf9fb395bde200b2fc11",
      ],
      verified_addresses: {
        eth_addresses: [
          "0xf7c371ea75f648cc3070b3f538e0bd68359fedc2",
          "0x4931b524640bcaeb2c94bf9fb395bde200b2fc11",
        ],
        sol_addresses: [],
      },
      active_status: "inactive",
      power_badge: false,
    },
    text: "@subcasterbot",
    timestamp: "2024-07-16T10:26:57.000Z",
    embeds: [],
    reactions: {
      likes_count: 0,
      recasts_count: 0,
      likes: [],
      recasts: [],
    },
    replies: {
      count: 0,
    },
    channel: {
      object: "channel_dehydrated",
      id: "nouns",
      name: "Nouns",
      image_url: "https://warpcast.com/~/channel-images/nouns.png",
    },
    mentioned_profiles: [
      {
        object: "user",
        fid: 792715,
        custody_address: "0xeb37b19a5665088a925ac4ff307854d51f36cc5d",
        username: "subcasterbot",
        display_name: "SubCaster",
        pfp_url:
          "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/9bced447-3edf-4959-6a29-5ff1d1b24c00/rectcrop3",
        profile: {
          bio: {
            text: "Bot to track your favourite users cast on Farcaster.",
            mentioned_profiles: [],
          },
        },
        follower_count: 1,
        following_count: 75,
        verifications: [],
        verified_addresses: {
          eth_addresses: [],
          sol_addresses: [],
        },
        active_status: "inactive",
        power_badge: false,
      },
    ],
  },
};

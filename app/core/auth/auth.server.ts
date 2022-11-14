import { Authenticator } from "remix-auth";
import { DiscordStrategy } from "remix-auth-socials";

import { env } from "../env.server";
import { findOrCreateUser } from "../models/user.server";
import { sessionStorage } from "./session.server";

export const authenticator = new Authenticator(sessionStorage, {
  sessionKey: "_session",
});

authenticator.use(
  new DiscordStrategy(
    {
      clientID: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      callbackURL: env.SITE_URL + "/auth/discord/callback",
    },
    async ({ profile }) => {
      const user = await findOrCreateUser({
        id: profile.id,
        displayName: profile.__json.username,
        avatar: profile.__json.avatar,
      });

      return user;
    }
  )
);

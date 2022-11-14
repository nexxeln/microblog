import { createCookieSessionStorage } from "@remix-run/node";
import { env } from "../env.server";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    secrets: [env.SESSION_SECRET], // replace this with an actual secret
    secure: env.NODE_ENV === "production", // enable this in prod only
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

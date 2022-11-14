import type { LoaderArgs } from "@remix-run/node";

import { authenticator } from "~/core/auth/auth.server";

export const loader = ({ request }: LoaderArgs) => {
  return authenticator.authenticate("discord", request, {
    successRedirect: "/",
    failureRedirect: "/",
  });
};

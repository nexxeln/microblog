import {
  type ActionArgs,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";

import { authenticator } from "~/core/auth/auth.server";

export const loader: LoaderFunction = () => redirect("/");

export const action = ({ request }: ActionArgs) => {
  return authenticator.authenticate("discord", request);
};

import { type LoaderArgs, redirect, json } from "@remix-run/node";
import { type User } from "@prisma/client/edge";
import { authenticator } from "~/core/auth/auth.server";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as User;

  if (user.id !== "758578599715405824") {
    return redirect("/");
  }

  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  return <div>hi {user.displayName}</div>;
}

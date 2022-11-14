import { type LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/core/auth/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });

  return user;
};

export default function Login() {
  return (
    <Form action="/auth/discord" method="post">
      <button type="submit" className="text-3xl">
        Login
      </button>
    </Form>
  );
}

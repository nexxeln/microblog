import {
  type LoaderArgs,
  redirect,
  json,
  type ActionArgs,
} from "@remix-run/node";
import { type User } from "@prisma/client/edge";
import { marked } from "marked";
import { authenticator } from "~/core/auth/auth.server";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createMicroblog } from "~/core/models/microblog.server";

type ActionData =
  | {
      microblog: string | null;
    }
  | undefined;

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const microblog = formData.get("microblog");

  const errors: ActionData = {
    microblog: microblog ? null : "Microblog is required",
  };

  const hasErrors = errors.microblog === null ? false : true;

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof microblog === "string", "microblog must be a string");

  await createMicroblog(marked.parse(microblog));

  return redirect("/");
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })) as User;

  if (user.id !== "758578599715405824") {
    return redirect("/");
  }

  return json({ user });
};

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();
  const errors = useActionData<typeof action>() as ActionData;
  console.log(errors);

  return (
    <div>
      <h3 className="text-2xl font-bold pt-6">
        Dashboard: hi {user.displayName}
      </h3>

      <Form method="post">
        <div className="flex flex-col gap-1">
          {errors?.microblog && (
            <span className="text-red-5">{errors.microblog}</span>
          )}
          <textarea
            name="microblog"
            id="microblog"
            cols={30}
            rows={10}
            placeholder="New microblog. Markdown is enabled."
            className="bg-neutral-9 rounded-md p-4 border border-neutral-7"
          />

          <button type="submit" className="hover:bg-neutral-9 w-36 mx-auto">
            Publish
          </button>
        </div>
      </Form>
    </div>
  );
}

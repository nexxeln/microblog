import type { LoaderArgs } from "@remix-run/node";
import type { Microblog } from "@prisma/client";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { formatRFC7231 } from "date-fns";

import { getMicroblogFromId } from "~/core/models/microblog.server";
import { Link, useCatch } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  const { id } = params;

  if (!id || typeof id !== "string") {
    throw new Error("Invalid id");
  }

  const microblog = await getMicroblogFromId(id);

  if (!microblog) {
    throw new Response("Not Found", { status: 404 });
  }

  return typedjson({ microblog });
};

export default function MicroblogPage() {
  const { microblog } = useTypedLoaderData<typeof loader>();

  return (
    <div className="flex flex-col pt-6">
      <div className="border-x border-neutral-7">
        <MicroblogPageCard {...microblog} />
      </div>
    </div>
  );
}

const MicroblogPageCard: React.FC<Microblog> = ({ id, text, createdAt }) => {
  return (
    <article className="w-full flex flex-col text-neutral-1 text-lg items-start border-y border-neutral-7 p-4 hover:bg-#101010 transition">
      <span className="text-sm text-neutral-4">{formatRFC7231(createdAt)}</span>
      <span>{text}</span>
    </article>
  );
};

export const CatchBoundary = () => {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="pt-24">
        <p className="text-3xl font-bold">Microblog Not Found</p>
        <Link to="/" className="underline text-2xl font-semibold pt-2">
          Go back to home
        </Link>
      </div>
    );
  }

  throw new Error(`Unsupported thrown Response status code: ${caught.status}`);
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <main>
      Oh no! Something went wrong! Couldn't fetch microblog.
      <pre>{error.message}</pre>
    </main>
  );
};

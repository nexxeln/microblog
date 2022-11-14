import { Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { formatDistanceToNow } from "date-fns";

import { getAllMicroblogs } from "~/core/microblog.server";

export const loader = async () => {
  const microblogs = await getAllMicroblogs();

  return typedjson({ microblogs });
};

export default function Index() {
  const { microblogs } = useTypedLoaderData<typeof loader>();

  return (
    <main className="flex flex-col items-center h-screen">
      <section className="w-4/5 md:w-3/5 items-center border-b border-neutral-7 pt-6">
        {microblogs.map((microblog) => (
          <MicroblogCard key={microblog.id} {...microblog} />
        ))}
      </section>
    </main>
  );
}

const MicroblogCard: React.FC<{
  id: string;
  text: string;
  createdAt: Date;
}> = ({ id, text, createdAt }) => {
  return (
    <Link to={`/${id}`}>
      <article className="flex flex-col text-neutral-1 text-lg items-start border-x border-t border-neutral-7 p-4 hover:bg-#101010 transition">
        <span className="text-sm text-neutral-4">
          {formatDistanceToNow(createdAt)} ago
        </span>
        <span>{text}</span>
      </article>
    </Link>
  );
};

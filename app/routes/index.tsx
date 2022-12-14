import { Link } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import type { Microblog } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";

import { getAllMicroblogs } from "~/core/models/microblog.server";

export const loader = async () => {
  const microblogs = await getAllMicroblogs();

  return typedjson({ microblogs });
};

export default function Index() {
  const { microblogs } = useTypedLoaderData<typeof loader>();

  return (
    <section className="flex flex-col pt-6">
      <div className="border-b border-neutral-7">
        {microblogs.map((microblog) => (
          <MicroblogCard key={microblog.id} {...microblog} />
        ))}
      </div>
    </section>
  );
}

const MicroblogCard: React.FC<Microblog> = ({ id, text, createdAt }) => {
  return (
    <Link to={`/${id}`}>
      <article className="flex flex-col text-neutral-1 text-blue- text-lg items-start p-4 border-x border-t border-neutral-7">
        <span className="text-sm text-neutral-4">
          {formatDistanceToNow(createdAt)} ago
        </span>
        <div dangerouslySetInnerHTML={{ __html: text }} className="microblog" />
      </article>
    </Link>
  );
};

import type { User } from "@prisma/client/edge";
import { db } from "../db.server";

export const findOrCreateUser = async ({ id, displayName, avatar }: User) => {
  const user = await db
    .selectFrom("User")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();

  if (user) return user;

  return await db
    .insertInto("User")
    .values({ id, displayName, avatar })
    .execute();
};

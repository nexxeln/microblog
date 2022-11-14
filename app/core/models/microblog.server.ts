import { db } from "../db.server";

export const getAllMicroblogs = async () => {
  return await db
    .selectFrom("Microblog")
    .selectAll()
    .orderBy("createdAt", "desc")
    .execute();
};

export const getMicroblogFromId = async (id: string) => {
  return await db
    .selectFrom("Microblog")
    .selectAll()
    .where("id", "=", id)
    .executeTakeFirst();
};

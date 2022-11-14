import { db } from "./db.server";

export const getAllMicroblogs = async () => {
  return await db
    .selectFrom("Microblog")
    .select(["id", "text", "createdAt"])
    .orderBy("createdAt", "desc")
    .execute();
};

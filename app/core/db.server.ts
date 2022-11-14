import type { Microblog } from "@prisma/client/edge";
import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import { env } from "./env.server";

interface Database {
  Microblog: Microblog;
}

export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: "aws.connect.psdb.cloud",
    username: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
  }),
});

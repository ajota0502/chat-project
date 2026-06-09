import { neon } from "@neondatabase/serverless";

export const createDb = (env: { DATABASE_URL: string }) => {
  return neon(env.DATABASE_URL);
};
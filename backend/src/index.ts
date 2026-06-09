import { Hono } from "hono";
import { cors } from "hono/cors";
import messages from "./routes/messages";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

app.get("/", (c) => {
  return c.json({ status: "ok" });
});

app.route("/", messages);

export default app;

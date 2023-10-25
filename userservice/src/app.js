import express from "express";
import { addAsync } from "@awaitjs/express";
import enforceSSL from "express-enforces-ssl";
import helmet from "helmet";
import dynamicGZIP from "compression";

const { Router } = express;
const app = addAsync(express());

app.enable("trust proxy");
if (config.NODE_ENV === "production") {
  app.use(enforceSSL());
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    }),
  );
}

app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ extended: false }));

import { ErrorHandlerMiddleware, NotFoundError } from "./errors.js";
import UserRouter from "./api/user-api.js";
import config from "./config.js";
import { syncDB } from "./models/index.js";

syncDB();

// API
const apiRouter = Router();
apiRouter.use("/users", UserRouter);
apiRouter.use("*", () => {
  throw new NotFoundError();
});
app.use("/", dynamicGZIP(), apiRouter, ErrorHandlerMiddleware);

export default app;

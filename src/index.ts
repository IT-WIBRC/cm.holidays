import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { personRouter, serviceRouter } from "./routes";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { Security } from "./middlewares/security";
import { NotFound, ErrorHandler } from "./middlewares/errors/Api";
import { initEnv } from "../configEnv";
import { postRouter } from "./routes/post";

initEnv();

const initApp = async (): Promise<unknown> => {
  try {
    await AppDataSource.initialize();

    const app = express();
    app
      .use(compression())
      .use(helmet({
        xssFilter: true,
        xContentTypeOptions: true
      }))
      .use(Security.xstAttackBlocker)
      .use(
        cors({
          origin: process.env.API_URL
        })
      )
      .use(express.urlencoded({ extended: true }))
      .use(express.json());

    app.get("/", (req, res) => {
      return res.json("Established connection!");
    });

    app.use("/user", personRouter);
    app.use("/service", serviceRouter);
    app.use("/post", postRouter);

    app.use((request: Request, response: Response, next: NextFunction) =>
      next(new NotFound(`Requested path ${request.path} not found`))
    );

    app.use(ErrorHandler.handle());

    return app.listen(process.env.PORT);
  } catch (error: unknown) {
    console.error(error);
  }
};

(async (): Promise<void> => {
  await initApp();
})();

process.on("uncaughtException", (err: Error) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
  console.log(reason.name, reason.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});
import express from 'express';
import { AppDataSource } from './data-source';
import { userRouter } from "./routes";

const initApp = async (): Promise<unknown> => {
    try {
        await AppDataSource.initialize();

        const app = express();
        app.use(express.json())
        app.get('/', (req, res) => {
            return res.json('Established connection!');
        })
        return app.listen(process.env.PORT);
    } catch (error: unknown) {
        console.error(error);
    }
}


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
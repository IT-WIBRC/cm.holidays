import { Router } from "express";

const userRouter = Router();

userRouter.post("/login");

userRouter.post("/sign-up");

userRouter.post("/reset-password-request");

userRouter.post("/reset-password");


export { userRouter };
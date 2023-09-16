import { Router } from "express";
import { handleFieldsValidation } from "../middlewares/validations/handler";
import { assertPostCreation } from "../middlewares/validations/entriesFields";
import { expressjwt } from "express-jwt";
import { DEFAULT_TOKEN_KEY, TOKEN_ENCRYPT_ALGO } from "../utils/constants";
import { initEnv } from "../../configEnv";
import { UserValidationRole } from "../middlewares/validations/user/Roles";
import { PostController } from "../controllers/Service/Post.controller";

initEnv();
const postRouter = Router();

postRouter.post(
  "/create",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  UserValidationRole.checkUserRole,
  assertPostCreation,
  handleFieldsValidation,
  PostController.create
);

export { postRouter };
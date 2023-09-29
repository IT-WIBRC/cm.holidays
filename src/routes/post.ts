import { Router } from "express";
import { handleFieldsValidation } from "../middlewares/validations/handler";
import { assertPostCreation } from "../middlewares/validations/entriesFields";
import { expressjwt } from "express-jwt";
import { DEFAULT_TOKEN_KEY, TOKEN_ENCRYPT_ALGO } from "../utils/constants";
import { initEnv } from "../../configEnv";
import { userHasRoles } from "../middlewares/validations/user/Roles";
import { PostController } from "../controllers/Service/Post.controller";

initEnv();
const postRouter = Router();

postRouter.post(
  "/add",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  userHasRoles(["ADMIN"]),
  assertPostCreation,
  handleFieldsValidation,
  PostController.create
);

postRouter.get(
  "/service/:id",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  userHasRoles(["ADMIN", "HUMAN_RESOURCE"], false),
  PostController.getPostByServiceId
);

postRouter.put(
  "/:id/activate",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  userHasRoles(["ADMIN"]),
  PostController.activePost
);

postRouter.get(
  "/all",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  userHasRoles(["ADMIN"]),
  PostController.getAll
);

export { postRouter };
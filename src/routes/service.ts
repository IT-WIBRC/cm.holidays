import { Router } from "express";
import { ServiceController } from "../controllers/Service/Service.controller";
import { handleFieldsValidation } from "../middlewares/validations/handler";
import { descriptionValidation, nameValidation } from "../middlewares/validations/entriesFields";
import { expressjwt } from "express-jwt";
import { DEFAULT_TOKEN_KEY, TOKEN_ENCRYPT_ALGO } from "../utils/constants";
import { initEnv } from "../../configEnv";
import { UserValidationRole } from "../middlewares/validations/user/Roles";

initEnv();
const serviceRouter = Router();

serviceRouter.post(
  "/create",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  UserValidationRole.checkUserRole,
  nameValidation,
  descriptionValidation,
  handleFieldsValidation,
  ServiceController.createService
);

export { serviceRouter };
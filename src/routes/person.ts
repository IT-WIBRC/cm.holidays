import { Router } from "express";
import { PersonController } from "../controllers/Person/Person.controller";
import {
  assertRequiredLoginFieldsAreNotEmpty, emailValidation,
  firstnameValidation,
  lastnameValidation, passwordValidation, postsValidation, rolesValidation
} from "../middlewares/validations/entriesFields";
import { handleFieldsValidation } from "../middlewares/validations/handler";
import { AdminController } from "../controllers/Person/Admin.controller";
import { userHasRoles } from "../middlewares/validations/user/Roles";
import { EmployeeController } from "../controllers/Person/Employee.controller";
import { expressjwt } from "express-jwt";
import { DEFAULT_TOKEN_KEY, TOKEN_ENCRYPT_ALGO } from "../utils/constants";

const personRouter = Router();

personRouter.post(
  "/login",
  assertRequiredLoginFieldsAreNotEmpty,
  handleFieldsValidation,
  PersonController.login
);

personRouter.post(
  "/add",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  firstnameValidation,
  lastnameValidation,
  emailValidation,
  passwordValidation,
  rolesValidation,
  postsValidation,
  handleFieldsValidation,
  userHasRoles(["ADMIN", "HUMAN_RESOURCE"], false),
  EmployeeController.create
);

personRouter.post(
  "/config/administrator",
  firstnameValidation,
  lastnameValidation,
  passwordValidation,
  emailValidation,
  handleFieldsValidation,
  AdminController.createAdmin
);

personRouter.get(
  "/:id",
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  }),
  PersonController.getById
);

export { personRouter };
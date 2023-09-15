import { Router } from "express";
import { PersonController } from "../controllers/Person/Person.controller";
import {
  assertRequiredLoginFieldsAreNotEmpty, emailValidation,
  firstnameValidation,
  lastnameValidation, passwordValidation
} from "../middlewares/validations/entriesFields";
import { handleFieldsValidation } from "../middlewares/validations/handler";
import { AdminController } from "../controllers/Person/AdminController";

const personRouter = Router();

personRouter.post(
  "/login",
  assertRequiredLoginFieldsAreNotEmpty,
  handleFieldsValidation,
  PersonController.login
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


export { personRouter };
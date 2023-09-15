import { Router } from "express";
import { PersonController } from "../controllers/Person/Person.controller";
import { assertRequiredLoginFieldsAreNotEmpty } from "../middlewares/validations/entriesFields";
import { handleFieldsValidation } from "../middlewares/validations/handler";

const personRouter = Router();

personRouter.post(
  "/login",
  assertRequiredLoginFieldsAreNotEmpty,
  handleFieldsValidation,
  PersonController.login
);

personRouter.post("/sign-up");

personRouter.post("/reset-password-request");

personRouter.post("/reset-password");


export { personRouter };
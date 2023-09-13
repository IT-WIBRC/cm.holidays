import { Router } from "express";
import { Person } from "../controllers/Person/Person";
import { assertRequiredLoginFieldsAreNotEmpty } from "../middlewares/validations/entriesFields";
import { handleFieldsValidation } from "../middlewares/validations/handler";

const personRouter = Router();

personRouter.post(
  "/login",
  assertRequiredLoginFieldsAreNotEmpty,
  handleFieldsValidation,
  Person.login
);

personRouter.post("/sign-up");

personRouter.post("/reset-password-request");

personRouter.post("/reset-password");


export { personRouter };
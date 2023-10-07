import { initEnv } from "../../configEnv";
import { Router } from "express";
import { expressjwt } from "express-jwt";
import { DEFAULT_TOKEN_KEY, TOKEN_ENCRYPT_ALGO } from "../utils/constants";
import { userHasRoles } from "../middlewares/validations/user/Roles";
import { HolidayRequestController } from "../controllers/HolidayRequest/HolidayRequest.controller";
import { handleFieldsValidation } from "../middlewares/validations/handler";
import { assertHolidayRequestCreation } from "../middlewares/validations/entriesFields";

initEnv();
const holidayRequestRouter = Router();

holidayRequestRouter.use(
  expressjwt({
    secret: process.env.TOKEN_KEY ?? DEFAULT_TOKEN_KEY,
    algorithms: [TOKEN_ENCRYPT_ALGO]
  })
)
  .get(
    "/all",
    userHasRoles(["ADMIN", "EMPLOYEE", "HUMAN_RESOURCE"], false),
    HolidayRequestController.getAll
  )
  .post(
    "/add",
    userHasRoles(["ADMIN", "EMPLOYEE", "HUMAN_RESOURCE"], false),
    assertHolidayRequestCreation,
    handleFieldsValidation,
    HolidayRequestController.create
  )
  .put(
    "/:id/status/:status",
    userHasRoles(["ADMIN", "EMPLOYEE", "HUMAN_RESOURCE"], false),
    HolidayRequestController.updateStatus
  );

export { holidayRequestRouter };

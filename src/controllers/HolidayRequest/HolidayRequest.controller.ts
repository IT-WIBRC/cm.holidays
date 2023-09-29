import { HolidayRequestDTO } from "../../entities/types";
import { asyncWrapper } from "../requestHanlder";
import { NextFunction, Request, Response } from "express";
import { PersonService } from "../../services/Person.service";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { HolidayRequestService } from "../../services/HolidayRequest.service";
import { HolidayRequest } from "../../entities/HolidayRequest";

export class HolidayRequestController {
  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<HolidayRequestDTO[]> {
    return await asyncWrapper(
      async ():
      Promise<Response<HolidayRequestDTO[]>> => {

        const {
          user: { email },
          roles: { isAdmin, isHumanResource }
        } = response.locals;

        const existingUser = await PersonService.findByEmail(email);

        if (!existingUser) {
          throw new ApiError(StatusCodes.BAD_REQUEST, "Unknown user");
        }

        let holidayRequests: HolidayRequest[];
        if (isAdmin || isHumanResource) {
          holidayRequests =  await HolidayRequestService.findForAdminUser();
          return response.status(StatusCodes.OK).json(holidayRequests);
        }
      
        holidayRequests =  await HolidayRequestService
          .findByUserId(existingUser.id);
        return response.status(StatusCodes.OK).json(holidayRequests);
      })(request, response, next);
  }
}
import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../requestHanlder";
import { HolidayTypeService } from "../../services/HolidayType.service";
import { regulariseSpacesFrom } from "../../utils/commons";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { HolidayType } from "../../entities/HolidayType";

export class HolidayTypeController {

  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<string>> {
    return await asyncWrapper(async () => {
      const {
        name,
        description
      } = request.body;

      const existingHolidayType = await HolidayTypeService
        .findByName(regulariseSpacesFrom(name));

      if (existingHolidayType) {
        throw new ApiError(StatusCodes.CONFLICT, "This holiday type already exist");
      }

      let holidayTypeToCreate: HolidayType | null = new HolidayType();
      holidayTypeToCreate.name = regulariseSpacesFrom(name);
      holidayTypeToCreate.description = regulariseSpacesFrom(description);

      holidayTypeToCreate = await HolidayTypeService
        .create(holidayTypeToCreate);
      if (!holidayTypeToCreate) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create this holiday type");
      }
      response.status(StatusCodes.CREATED).send(holidayTypeToCreate.id);
    })(request, response, next);
  }
}
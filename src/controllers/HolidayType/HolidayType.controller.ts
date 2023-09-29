import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../requestHanlder";
import { HolidayTypeService } from "../../services/HolidayType.service";
import { regulariseSpacesFrom } from "../../utils/commons";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { HolidayType } from "../../entities/HolidayType";
import { HolidayTypeDTO } from "../../entities/types";

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
      return response.status(StatusCodes.CREATED).json(holidayTypeToCreate.id);
    })(request, response, next);
  }

  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<HolidayTypeDTO[]>> {
    return await asyncWrapper(async () => {
      const holidayTypes: HolidayType[] = await HolidayTypeService.findAll();

      return response.status(StatusCodes.OK).json(holidayTypes);
    })(request, response, next);
  }
}
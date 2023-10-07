import { HolidayRequestDTO, HolidayStatusDTO } from "../../entities/types";
import { asyncWrapper } from "../requestHanlder";
import { NextFunction, Request, Response } from "express";
import { PersonService } from "../../services/Person.service";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { HolidayRequestService } from "../../services/HolidayRequest.service";
import { HolidayRequest } from "../../entities/HolidayRequest";
import { HolidayTypeService } from "../../services/HolidayType.service";

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

  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<HolidayRequestDTO[]> {
    return await asyncWrapper(async (): Promise<Response<string>> => {
      const {
        startingDate,
        endingDate,
        returningDate,
        description,
        type
      } = request.body;

      const {
        user: { id }
      } = response.locals;
      const existingEmployee = await PersonService.findUserById(id);

      if (!existingEmployee) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Unknown User");
      }

      const existingHolidayType = await HolidayTypeService.findById(type.id);

      if (!existingHolidayType) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Unknown User");
      }

      const holidayRequestsWithSameStartingDate =
        await HolidayRequestService
          .findByUserIdAndStartingDate(id, startingDate);

      if (holidayRequestsWithSameStartingDate) {
        throw new ApiError(StatusCodes.CONFLICT, "There is another holiday with the same starting date");
      }

      let newHolidayRequest = new HolidayRequest();
      newHolidayRequest.type = existingHolidayType;
      newHolidayRequest.employee = existingEmployee;
      newHolidayRequest.status = HolidayStatusDTO.DRAFT;
      newHolidayRequest.returningDate = returningDate;
      newHolidayRequest.endingDate = endingDate;
      newHolidayRequest.startingDate = startingDate;
      newHolidayRequest.description = description;

      newHolidayRequest = await HolidayRequestService.create(newHolidayRequest);

      if (!newHolidayRequest) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to created due to the server");
      }

      return response.status(StatusCodes.CREATED).json(newHolidayRequest.id);

    })(request, response, next);
  }

  static async updateStatus(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<HolidayRequestDTO[]> {
    return await asyncWrapper(async (): Promise<Response<string>> => {
      const { id, status } = request.params;
      const {
        isAdmin,
        isHumanResource
      } = response.locals.roles;

      const isKnownStatus = Object.keys(HolidayStatusDTO)
        .map((status) => status.toLowerCase())
        .includes(status.toLowerCase());

      if (
        !isKnownStatus
        || status.toLowerCase() === HolidayStatusDTO.DRAFT.toLowerCase()
        || !id
      ) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-4000");
      }

      const existingHolidayRequest = await HolidayRequestService.findById(id);

      if (!existingHolidayRequest) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-4004");
      }

      const adminStatus = [
        HolidayStatusDTO.APPROVED.toLowerCase(),
        HolidayStatusDTO.REJECTED.toLowerCase()
      ];

      const otherStatus = [
        HolidayStatusDTO.PENDING.toLowerCase(),
        HolidayStatusDTO.DRAFT.toLowerCase()
      ];
      const cannotMakeBackOperation =
        adminStatus.includes(existingHolidayRequest.status.toLowerCase())
        && otherStatus.includes(status.toLowerCase());

      if (cannotMakeBackOperation) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-4000");
      }

      const isAdminOperation = adminStatus.includes(status.toLowerCase());

      const isOtherOperation =
        HolidayStatusDTO.PENDING.toLowerCase() === status.toLowerCase();

      const canMakeTheStatusChanged =
        (isAdminOperation && (isAdmin || isHumanResource))
        || isOtherOperation;

      if (!canMakeTheStatusChanged) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "HOLIDAY-REQUEST-4001");
      }

      existingHolidayRequest.status =
        HolidayStatusDTO[status as keyof typeof HolidayStatusDTO];

      await HolidayRequestService.update(existingHolidayRequest);

      return response.status(StatusCodes.OK).json(existingHolidayRequest.id);

    })(request, response, next);
  }

  static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return await asyncWrapper(async (): Promise<void> => {
      const { id } = response.locals.user;
      const { id: holidayId } = request.params;
      const {
        startingDate,
        endingDate,
        returningDate,
        description,
        type
      } = request.body;

      if (!holidayId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-4000");
      }

      const existingHolidayRequest =
        await HolidayRequestService.findById(holidayId);

      if (!existingHolidayRequest) {
        throw new ApiError(StatusCodes.NOT_FOUND, "HOLIDAY-REQUEST-4004");
      }

      if (existingHolidayRequest.status !== HolidayStatusDTO.DRAFT) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-3000");
      }

      const existingEmployee = await PersonService.findUserById(id);
      if (!existingEmployee) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-4009");
      }

      if (type && type.id) {
        const existingHolidayType = await HolidayTypeService.findById(type.id);

        if (!existingHolidayType) {
          throw new ApiError(StatusCodes.BAD_REQUEST, "HOLIDAY-REQUEST-4009");
        }
        existingHolidayRequest.type = existingHolidayType;
      }

      if (returningDate) existingHolidayRequest.returningDate = returningDate;
      if (endingDate) existingHolidayRequest.endingDate = endingDate;
      if (startingDate) existingHolidayRequest.startingDate = startingDate;
      if (description) existingHolidayRequest.description = description;

      await HolidayRequestService.update(existingHolidayRequest);

      response.sendStatus(StatusCodes.NO_CONTENT);
    })(request, response, next);
  }
}
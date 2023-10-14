import { NextFunction, Request, Response } from "express";
import { COMMONS_ERRORS_CODES, ServiceDTO } from "../../entities/types";
import { asyncWrapper } from "../requestHanlder";
import { CompanyService } from "../../services/Company.service";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { regulariseSpacesFrom } from "../../utils/commons";

export class ServiceController {
  static async createService(request: Request,
    response: Response,
    next: NextFunction): Promise<Response<ServiceDTO>> {
    return await asyncWrapper(async () => {
      const service = await CompanyService
        .findServiceByName(regulariseSpacesFrom(request.body.name));

      if (service) {
        throw  new ApiError(
          StatusCodes.CONFLICT,
          COMMONS_ERRORS_CODES.CONFLICTS
        );
      }

      const {
        name,
        description
      } = request.body;
      const newCreatedService = await CompanyService.create({
        name: regulariseSpacesFrom(name),
        description: regulariseSpacesFrom(description),
        isActive: false
      });

      if (!newCreatedService) {
        throw new ApiError(StatusCodes.CONFLICT,
          COMMONS_ERRORS_CODES.CONFLICTS);
      }
      return response.status(StatusCodes.CREATED).json(newCreatedService.id);
    })(request, response, next);
  }

  static async getAllServices(request: Request,
    response: Response,
    next: NextFunction): Promise<Response<ServiceDTO>> {
    return await asyncWrapper(async () => {

      const { isAdmin, isHumanResource } = response.locals.roles;
      const services = await CompanyService.findAll(
        {
          withRelation: true,
          isAdmin: isAdmin || !isHumanResource
        }
      );

      return response.status(StatusCodes.OK).json(services);
    })(request, response, next);
  }

  static async toggleService(request: Request,
    response: Response,
    next: NextFunction): Promise<Response<void>> {
    return await asyncWrapper(async () => {

      const isActivation = request.path.split("/").includes("activate");
      const service = await CompanyService.findServiceById(request.params.id);
      if (!service) {
        throw new ApiError(StatusCodes.NOT_FOUND,
          COMMONS_ERRORS_CODES.NOT_FOUND);
      }

      if (isActivation) {
        if (service.isActive) {
          throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,
            COMMONS_ERRORS_CODES.ALREADY_IN_THAT_STATE);
        }
      } else {
        if (!service.isActive) {
          throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY,
            COMMONS_ERRORS_CODES.ALREADY_IN_THAT_STATE);
        }
      }


      service.isActive = isActivation;
      await CompanyService.toggle(service);

      return response.sendStatus(StatusCodes.NO_CONTENT);
    })(request, response, next);
  }
}
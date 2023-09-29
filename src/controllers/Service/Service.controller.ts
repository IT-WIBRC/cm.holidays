import { NextFunction, Request, Response } from "express";
import { ServiceDTO } from "../../entities/types";
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
          "This service already exist"
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
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Creation failed to proceed");
      }
      return response.status(StatusCodes.CREATED).send(newCreatedService.id);
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

      return response.status(StatusCodes.OK).send(services);
    })(request, response, next);
  }

  static async activeService(request: Request,
    response: Response,
    next: NextFunction): Promise<Response<void>> {
    return await asyncWrapper(async () => {

      if (!request.params.id) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No id found");
      }

      const service = await CompanyService.findServiceById(request.params.id);
      if (!service) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Service not found");
      }

      if (service.isActive) {
        throw new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, "Service is already active");
      }

      service.isActive = true;
      await CompanyService.activate(service);

      return response.sendStatus(StatusCodes.NO_CONTENT);
    })(request, response, next);
  }
}
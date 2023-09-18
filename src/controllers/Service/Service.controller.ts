import { NextFunction, Request, Response } from "express";
import { ServiceDTO } from "../../entities/types";
import { asyncWrapper } from "../requestHanlder";
import { CompanyService } from "../../services/service/Service";
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

      const { name, description } = request.body;
      const newCreatedService  = await CompanyService.create({
        name: regulariseSpacesFrom(name),
        description: regulariseSpacesFrom(description),
        isActive: false
      });

      if (!newCreatedService) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Creation failed to proceed");
      }
      return response.sendStatus(StatusCodes.CREATED);
    })(request, response, next);
  }
}
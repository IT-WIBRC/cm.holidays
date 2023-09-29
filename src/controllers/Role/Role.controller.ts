import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../requestHanlder";
import { RoleService } from "../../services/Role.service";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { Role } from "../../entities/Role";

export class RoleController {
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string> {
    return await asyncWrapper(async () => {
      const {
        type,
        description
      } = request.body;
      const role = await RoleService.findRoleByType(type);

      if (role) {
        throw new ApiError(StatusCodes.CONFLICT, "Role already exist");
      }

      let roleToCreate = new Role();
      roleToCreate.type = type;
      roleToCreate.description = description;

      roleToCreate = await RoleService.create(roleToCreate);
      if (!roleToCreate) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to create this role");
      }
      response.status(StatusCodes.CREATED).send(roleToCreate.id);
    })(request, response, next);
  }

  static async getAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<string> {
    return await asyncWrapper(async () => {

      const { isAdmin, isHumanResource } = response.locals.roles;
      const roles = await RoleService.findAll(isAdmin || !isHumanResource);
      return response.status(StatusCodes.OK).send(roles);
    })(request, response, next);
  }
      
}
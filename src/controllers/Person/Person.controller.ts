import { EmployeeDTO } from "../../entities/types";
import { NextFunction, Request, Response } from "express";
import { PersonService } from "../../services/Person.service";
import { Auth } from "../../utils/auth";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../requestHanlder";
import { Role } from "../../entities/Role";
import { RoleService } from "../../services/Role.service";
import { Employee } from "../../entities/Employee";
import { SettingService } from "../../services/Setting.service";
import { regulariseSpacesFrom } from "../../utils/commons";

export class PersonController {
  static async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<EmployeeDTO>> {
    return await asyncWrapper(async () => {
      const person = await PersonService
        .findByEmail(regulariseSpacesFrom(request.body.email, ""));

      if (!person) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Person not found");
      }

      const isSame: boolean = await Auth.comparePassword(
        request.body.password,
        person.password
      );

      if (!isSame) {
        throw  new ApiError(
          StatusCodes.BAD_REQUEST,
          "Wrong information provided"
        );
      }

      return response.status(200).json({
        id: person.id,
        token: Auth.generateToken(person)
      });
    })(request, response, next);
  }

  static async create(request: Request,
    response: Response,
    next: NextFunction): Promise<string> {
    return asyncWrapper(async () => {
      const { firstname, lastName, password, email, roles } = request.body;

      const person = await PersonService.findByEmail(email);

      if (person) {
        throw new ApiError(StatusCodes.CONFLICT, "Person already exist");
      }

      if (!roles.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Request has been malformed");
      }

      const existingRole: Role[] = [];
      for (const role of roles) {
        const resultRole = await RoleService.findRoleById(role.id);
        if (resultRole) existingRole.push(resultRole);
      }

      if (existingRole.length !== roles.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Request has been malformed");
      }

      const setting = await SettingService.create({
        defaultEmailNotification: email
      });

      let newUser: Employee | null = new Employee();
      newUser.firstname = regulariseSpacesFrom(firstname);
      newUser.lastName = regulariseSpacesFrom(lastName);
      newUser.password = password;
      newUser.email = regulariseSpacesFrom(email, "").toLowerCase();
      newUser.setting = setting;
      newUser.roles = existingRole;

      newUser = await PersonService.create(newUser);
      if (!newUser) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "User has failed to be create");
      }

      return response.status(StatusCodes.CREATED).json(newUser.id);
    })(request, request, next);
  }
}
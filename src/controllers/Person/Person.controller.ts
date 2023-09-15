import { EmployeeDTO } from "../../entities/types";
import { NextFunction, Request, Response } from "express";
import { PersonService } from "../../services/person/PersonService";
import { Auth } from "../../utils/auth";
import { ApiError } from "../../middlewares/errors/Api";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../requestHanlder";

export class PersonController {
  static async login(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<EmployeeDTO>> {
    return await asyncWrapper(async () => {
      const employee = await PersonService.findByEmail(request.body.email);

      if (!employee) {
        throw new ApiError(StatusCodes.NOT_FOUND, "PersonController not found");
      }

      const isSame: boolean = await Auth.comparePassword(
        request.body.password,
        employee.password
      );

      if (!isSame) {
        throw  new ApiError(
          StatusCodes.BAD_REQUEST,
          "Wrong information provided"
        );
      }

      return response.status(200).send({
        id: employee.id,
        token: Auth.generateToken(employee)
      });
    })(request, response, next);
  }
}
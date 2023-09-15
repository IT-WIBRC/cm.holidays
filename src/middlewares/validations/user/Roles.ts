import { Request as JWTRequest } from "express-jwt";
import { NextFunction, Response } from "express";
import { RoleDTO, USER_ROLE } from "../../../entities/types";
import { ApiError } from "../../errors/Api";
import statusCode from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { TokenPayload } from "../../../utils/types";
export class UserValidationRole {

  static checkUserRole(
    request: JWTRequest,
    response: Response,
    next: NextFunction
  ) {
    const parsedToken: JwtPayload | undefined = request.auth;
    if (UserValidationRole.isUserAdmin(parsedToken as TokenPayload)) {
      next();
    } else {
      next(
        new ApiError(
          statusCode.UNAUTHORIZED,
          "User has not authorization to do that")
      );
    }
  }

  private static isUserAdmin (token: TokenPayload): boolean {
    return Boolean(token?.
      infos?.roles
      .find((role: RoleDTO) => role.type === USER_ROLE.ADMIN));
  }
}
import { compare, hash } from "bcrypt";
import { TOKEN_ERROR, TokenPayload } from "./types";
import { sign, verify } from "jsonwebtoken";
import { EmployeeDTO } from "../entities/types";

type VerifyToken = TokenPayload | string;
export class Auth {
  private static SALBOUND: number = 10;
  private static TOKEN_KEY: string = process.env.TOKEN_KEY ?? "12345";
  static async makeHash(password: string): Promise<string> {
    return await hash(password, this.SALBOUND);
  }

  static async comparePassword(plainTextPassword: string, passwordHashed: string): Promise<boolean> {
    return compare(plainTextPassword, passwordHashed);
  }

  static generateToken (employee: EmployeeDTO, time = "2h"): string {
    const {
      id,
      firstname,
      lastName,
      email,
      roles
    } = employee;
    return JSON.stringify(
      sign({
        id,
        infos: {
          email,
          firstname,
          lastName,
          roles
        }
      } as TokenPayload, this.TOKEN_KEY, {
        algorithm: "HS512",
        expiresIn: time
      })
    );
  }

  static parseToken (token: string): VerifyToken  {
    let parsedToken: VerifyToken = "";
    let errorTokenMessage: TOKEN_ERROR = TOKEN_ERROR.ANY;
    verify(token, this.TOKEN_KEY, (err, parsed): void => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            errorTokenMessage = TOKEN_ERROR.EXPIRED;
            break;
          case "JsonWebTokenError":
            errorTokenMessage = TOKEN_ERROR.INVALID;
            break;
          case "NotBeforeError":
            errorTokenMessage = TOKEN_ERROR.ACTIVE;
            break;
          default:
            errorTokenMessage = TOKEN_ERROR.OTHER;
            break;
        }
      } else parsedToken = parsed as VerifyToken;
    });
    return errorTokenMessage ? errorTokenMessage : parsedToken;
  }
}
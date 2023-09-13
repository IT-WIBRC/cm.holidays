import { RoleDTO } from "../entities/types";

export enum TOKEN_ERROR {
  EXPIRED = "Token has expired",
  INVALID = "Invalid token",
  ACTIVE = "Token not active",
  OTHER = "Other errors",
  ANY = ""
}

export type TokenPayload = {
  id: string;
  infos: {
    lastName: string;
    firstname: string;
    email: string;
    roles: RoleDTO[]
  };
};
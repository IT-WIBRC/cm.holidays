import { RoleDTO } from "../entities/types";

export type TokenPayload = {
  id: string;
  infos: {
    lastName: string;
    firstname: string;
    email: string;
    roles: RoleDTO[]
  };
};
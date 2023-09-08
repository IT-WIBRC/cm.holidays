import type { HolidayRequestDTO } from "./holidayRequest";

export enum ROLE {
    ADMIN = "ADMIN",
    EMPLOYEE = "EMPLOYEE",
    HUMAN_RESOURCE = "HUMAN_RESOURCE"
}

export enum DEPARTMENT {
    FRONT_END = "FRONT_END",
    BACK_END = "BACK_END",
    PROJECT_MANAGEMENT = "PROJECT_MANAGEMENT",
    INFRASTRUCTURE = "INFRASTRUCTURE"
}

export interface EmployeeDTO {
    id: string;
    firstname: string;
    lastName: string;
    password: string;
    email: string;
    role: RoleDTO;
    holidays: HolidayRequestDTO[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface RoleDTO {
    id: string;
    type: ROLE;
    description?: string;
}

export interface DepartmentDTO {
    id: string;
    type: DEPARTMENT;
    description?: string;
}

export type PayloadSession = {
    id: string;
    profile: {
        username: string;
        email: string;
        name: string;
    };
    key: string;
};

export type EmployeeCreationDTO = Partial<EmployeeDTO>;

export enum TOKEN_TYPE {
    BEARER = "Bearer",
    WIBRC = "Wibrc",
}

export type TOKEN = {
    access_token: string;
    type: TOKEN_TYPE;
};
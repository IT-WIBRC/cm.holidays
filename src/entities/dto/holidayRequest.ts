import {EmployeeDTO} from "./employee";

export interface HolidayRequestDTO {
    id: string;
    description: string;
    startingDate: Date;
    endingDate: Date;
    returningDate: Date;
    type: HOLIDAY_TYPE;
    employee: EmployeeDTO;
}

export enum HOLIDAY_TYPE {
    ANNUAL= "ANNUAL",
    MATERNITY= "MATERNITY",
    ADVENTURE= "ADVENTURE",
    CYCLING= "CYCLING",
    FAMILY= "FAMILY",
    CITY_BREAKS= "CITY_BREAKS"
}
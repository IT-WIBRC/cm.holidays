import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { HolidayTypeDTO } from "./types";
import {HolidayRequest} from "./HolidayRequest";

@Entity({
    name: "t_holidayType",
})
export class HolidayType implements HolidayTypeDTO {
    @PrimaryGeneratedColumn("uuid")
    @Column({
        primary: true,
        type: "uuid",
        nullable: false,
        unique: true,
    })
    declare id: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    declare type: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    declare description?: string;
}
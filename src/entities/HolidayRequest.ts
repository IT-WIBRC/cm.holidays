import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Employee } from "./Employee";
import { HolidayRequestDTO } from "./types";
import {HolidayType} from "./HolidayType";

@Entity({
    name: "t_holidayRequest",
})
export class HolidayRequest implements HolidayRequestDTO {
    @PrimaryGeneratedColumn("uuid")
    @Column({
        primary: true,
        type: "uuid",
        nullable: false,
        unique: true,
    })
    declare id: string;

    @Column({
        type: "date",
        nullable: false,
    })
    declare startingDate: string;

    @Column({
        type: "date",
        nullable: false,
    })
    declare endingDate: string;

    @Column({
        type: "date",
        nullable: false,
    })
    declare returningDate: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    declare description: string;

    @ManyToOne(() => Employee, (employee) => employee.holidays)
    declare employee: Employee;

    @OneToOne(() => HolidayType)
    declare holidayType: HolidayType;
}
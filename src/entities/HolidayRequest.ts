import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { HOLIDAY_TYPE, HolidayRequestDTO } from "./dto/holidayRequest";

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
    declare startingDate: Date;

    @Column({
        type: "date",
        nullable: false,
    })
    declare endingDate: Date;

    @Column({
        type: "date",
        nullable: false,
    })
    declare returningDate: Date;

    @Column({
        type: "varchar",
        nullable: false,
    })
    declare description: string;

    @Column({
        type: "enum",
        enum: HOLIDAY_TYPE,
        nullable: false,
    })
    declare type: HOLIDAY_TYPE;

    @ManyToOne(() => Employee, (employee) => employee.holidays)
    declare employee: Employee;
}
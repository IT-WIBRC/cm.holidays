import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { HolidayRequestDTO, HolidayTypeDTO  } from "./types";

@Entity({
  name: "t_holidayRequest"
})
export class HolidayRequest implements HolidayRequestDTO {
    @PrimaryGeneratedColumn("uuid")
    @Column({
      primary: true,
      type: "uuid",
      nullable: false,
      unique: true
    })
  declare id: string;

    @Column({
      type: "date",
      nullable: false
    })
    declare startingDate: string;

    @Column({
      type: "date",
      nullable: false
    })
    declare endingDate: string;

    @Column({
      type: "date",
      nullable: false
    })
    declare returningDate: string;

    @Column({
      type: "varchar",
      nullable: false
    })
    declare description: string;

    @ManyToOne(() => Employee, (employee) => employee.holidays)
    declare employee: Employee;

    @Column({
      type: "varchar",
      nullable: false,
      default: "DRAFT"
    })
    declare holidayType: HolidayTypeDTO;
}
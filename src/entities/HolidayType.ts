import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { HolidayTypeDTO  } from "./types";

@Entity({
  name: "t_holidayType"
})
export class HolidayType implements HolidayTypeDTO {
  @PrimaryGeneratedColumn("uuid")
  @Column({
    primary: true,
    type: "uuid",
    nullable: false,
    unique: true
  })
  declare id: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  declare name: string;

  @Column({
    type: "varchar",
    nullable: true
  })
  declare description: string;
}
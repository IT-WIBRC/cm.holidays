import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import type { RoleDTO } from "./dto/employee";
import {ROLE} from "./dto/employee";

@Entity({
    name: "t_role",
})
export class Role implements RoleDTO {
    @PrimaryGeneratedColumn("uuid")
    @Column({
        primary: true,
        type: "uuid",
        nullable: false,
        unique: true,
    })
    declare id: string;

    @Column({
        type: "enum",
        enum: ROLE,
        nullable: false,
    })
    declare type: ROLE;

    @Column({
        type: "varchar",
        nullable: false,
    })
    declare description: string;
}
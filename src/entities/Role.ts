import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleDTO, USER_ROLE } from "./services";

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
        enum: USER_ROLE,
        nullable: false,
    })
    declare type: USER_ROLE;

    @Column({
        type: "varchar",
        nullable: false,
    })
    declare description: string;
}
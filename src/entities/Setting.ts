import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: "t_settings",
})
export class Setting {
    @PrimaryGeneratedColumn("uuid")
    @Column({
        primary: true,
        type: "uuid",
        nullable: false,
        unique: true,
    })
    declare id: string;
}
import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "./Employee";
import {Role} from "./Role";

@Entity({
    name: "t_employee_role",
})
export class EmployeeRole {
    @PrimaryGeneratedColumn("uuid")
    @Column({
        primary: true,
        type: "uuid",
        nullable: false,
        unique: true,
    })
    declare id: string;

    @Column({
        type: "uuid",
        unique: true,
        nullable: false,
    })
    @PrimaryColumn()
    declare employeeId: string;

    @Column({
        type: "uuid",
        unique: true,
        nullable: false,
    })
    @PrimaryColumn()
    declare roleId: string;

    @ManyToOne(() => Employee, (employee) => employee.roles)
    @JoinColumn({ name: "employeeId" })
    declare employee: Employee

    @ManyToOne(() => Role, (role) => role.employees)
    @JoinColumn({ name: "roleId" })
    declare roles: Role
}
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate, OneToOne, OneToMany,
    JoinColumn,
} from "typeorm";
import { Auth } from "../utils/auth";
import { EmployeeDTO } from "./services";
import {Role} from "./Role";
import { HolidayRequest } from "./HolidayRequest";
@Entity({
    name: "t_employee",
})
export class Employee implements EmployeeDTO {
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
    declare firstname: string;

    @Column({
        nullable: false,
        type: "varchar",
        unique: true,
    })
    declare lastName: string;

    @Column({
        nullable: false,
        type: "text",
        unique: true,
    })
    declare password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hasPasswordAtCreation(): Promise<void> {
        if (this.password) this.password = await Auth.makeHash(this.password);
    }

    @Column({
        nullable: false,
        type: "varchar",
        unique: true,
    })
    declare email: string;

    @CreateDateColumn({ name: "created_at" })
    declare createdAt?: string;

    @UpdateDateColumn({ name: "updated_at" })
    declare updatedAt?: string;

    @OneToOne(() => Role)
    @JoinColumn()
    declare role: Role

    @OneToMany(() => HolidayRequest, (holidayRequest) => holidayRequest.employee)
    declare holidays: HolidayRequest[]
}
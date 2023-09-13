import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {PostDTO} from "./types";
import {Service} from "./Service";
import {PostEmployee} from "./PostEmployee";

@Entity({
    name: "t_post",
})
export class Post implements PostDTO {
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
    declare name: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    declare description?: string;

    @Column({ type: "boolean", nullable: false })
    declare isActive: boolean;

    @CreateDateColumn({ name: "created_at" })
    declare createdAt?: string;

    @UpdateDateColumn({ name: "updated_at" })
    declare updatedAt?: string;

    @OneToOne(() => Service)
    declare service: Service;

    @OneToMany(() => PostEmployee, (postEmployee) => postEmployee.posts)
    @JoinColumn({ name: "employeeId" })
    declare employee: PostEmployee[];
}
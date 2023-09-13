import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
import { Post } from "./Post";

@Entity({
  name: "t_post_employee"
})
export class PostEmployee {
    @PrimaryGeneratedColumn("uuid")
    @Column({
      primary: true,
      type: "uuid",
      nullable: false,
      unique: true
    })
  declare id: string;

    @Column({
      type: "uuid",
      unique: true,
      nullable: false
    })
    @PrimaryColumn()
    declare employeeId: string;

    @Column({
      type: "uuid",
      unique: true,
      nullable: false
    })
    @PrimaryColumn()
    declare postId: string;

    @ManyToOne(() => Employee, (employee) => employee.posts)
    @JoinColumn({ name: "employeeId" })
    declare employee: Employee;

    @ManyToOne(() => Post, (post) => post.employee)
    @JoinColumn({ name: "postId" })
    declare posts: Post;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, type Relation } from "typeorm";
import { User } from "./User.js";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user!: Relation<User>;   
}
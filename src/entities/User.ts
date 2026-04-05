import { Entity, PrimaryGeneratedColumn, Column, OneToMany, type Relation } from "typeorm";
import { Todo } from "./Todo.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos!: Relation<Todo[]>;
}
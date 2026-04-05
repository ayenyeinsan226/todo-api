import { DataSource } from "typeorm";
import { User } from "../entities/User.js";
import { Todo } from "../entities/Todo.js";
import { env } from "./env.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Todo],
});
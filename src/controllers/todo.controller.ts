import type { Request, Response } from "express";
import { AppDataSource } from "../config/database.js";
import { Todo } from "../entities/Todo.js";
import { User } from "../entities/User.js";
import { getParamAsNumber } from "../utils/param.js";

const todoRepo = AppDataSource.getRepository(Todo);
const userRepo = AppDataSource.getRepository(User);

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = (req as any).user.id;

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) return res.status(404).json({ message: "User not found" });

  const todo = todoRepo.create({ title, user });
  await todoRepo.save(todo);

  res.json(todo);
};

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { completed } = req.query;

  const todos = await todoRepo.find({
    where: {
      user: { id: userId },
      ...(completed !== undefined && { completed: completed === "true" }),
    },
  });

  res.json(todos);
};


export const updateTodo = async (req: Request, res: Response) => {
  const todoId = getParamAsNumber(req.params.id, "Todo ID");
  const { title, completed } = req.body;

  const todo = await todoRepo.findOneBy({ id: todoId });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  await todoRepo.save(todo);
  res.json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todoId = getParamAsNumber(req.params.id, "Todo ID");

  const todo = await todoRepo.findOneBy({ id: todoId });
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  await todoRepo.remove(todo);
  res.json({ message: "Todo deleted" });
};

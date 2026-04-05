import type { Request, Response } from "express";
import { AppDataSource } from "../config/database.js";
import { User } from "../entities/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await userRepo.findOneBy({ email });
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ email, password: hashedPassword });
  await userRepo.save(user);

  res.json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepo.findOneBy({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
  { id: user.id, email: user.email },
  env.JWT_SECRET,
  { expiresIn: "1h" }
  );

  res.json({ token });
};
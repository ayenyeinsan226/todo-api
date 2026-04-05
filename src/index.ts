import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./config/database.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));
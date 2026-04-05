import dotenv from "dotenv";

dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  DB_HOST: getEnv("DB_HOST"),
  DB_PORT: Number(getEnv("DB_PORT")),
  DB_USER: getEnv("DB_USER"),
  DB_PASSWORD: getEnv("DB_PASSWORD"),
  DB_NAME: getEnv("DB_NAME"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  PORT: Number(getEnv("PORT")),
} as const;   // ⭐ VERY IMPORTANT
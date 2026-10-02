import "dotenv/config";
import { AppError } from "../utils/errors";

function readEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (value === undefined || value === "") {
    if (fallback === undefined) {
      throw new AppError(`Missing required environment variable: ${name}`, 500);
    }
    return fallback;
  }
  return value;
}

function readRequiredEnv(name: string): string {
  const value = readEnv(name);
  const insecureDefaults: Record<string, string> = {
    JWT_SECRET: "change-this-in-production-to-a-long-random-string",
    ADMIN_REGISTER_KEY: "change-this-admin-register-key",
  };

  if (insecureDefaults[name] === value) {
    throw new AppError(
      `${name} still uses the placeholder value. Set a unique secret before starting the server.`,
      500
    );
  }
  if (value.length < 16) {
    throw new AppError(`${name} must be at least 16 characters long`, 500);
  }
  return value;
}

function readOrigins(): string[] {
  const raw = readEnv("CORS_ORIGINS", "");
  if (!raw) return [];
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

export const env = {
  PORT: Number(readEnv("PORT", "4000")),
  DATABASE_URL: readEnv("DATABASE_URL", "file:../data/database.sqlite"),
  JWT_SECRET: readRequiredEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: readEnv("JWT_EXPIRES_IN", "7d"),
  JWT_ALGORITHM: "HS256" as const,
  NODE_ENV: readEnv("NODE_ENV", "development"),
  CORS_ORIGINS: readOrigins(),
  ADMIN_REGISTER_KEY: readEnv("ADMIN_REGISTER_KEY", ""),
  TELEGRAM_BOT_TOKEN: readEnv("TELEGRAM_BOT_TOKEN", ""),
  TELEGRAM_CHAT_ID: readEnv("TELEGRAM_CHAT_ID", ""),
  RATE_LIMIT_WINDOW_MS: Number(readEnv("RATE_LIMIT_WINDOW_MS", "60000")),
  RATE_LIMIT_MAX_REQUESTS: Number(readEnv("RATE_LIMIT_MAX_REQUESTS", "20")),
  AUTH_RATE_LIMIT_MAX_REQUESTS: Number(readEnv("AUTH_RATE_LIMIT_MAX_REQUESTS", "5")),
};
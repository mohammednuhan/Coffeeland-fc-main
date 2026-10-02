import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { createServer } from "./server.js";

const SHUTDOWN_TIMEOUT_MS = 10_000;

async function bootstrap(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("Database connected (SQLite via Prisma)");

    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      console.warn(
        "WARNING: Telegram is not configured. Registrations will be saved but NOT delivered."
      );
    }

    const server = createServer();

    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${env.PORT} is already in use.`);
      } else {
        console.error("Server error:", error);
      }
      process.exit(1);
    });

    server.listen(env.PORT, "0.0.0.0", () => {
      console.log(`Coffeeland FC backend listening on port ${env.PORT}`);
    });

    let shuttingDown = false;
    const shutdown = async (signal: string) => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.log(`${signal} received — shutting down`);

      const forceExit = setTimeout(() => process.exit(1), SHUTDOWN_TIMEOUT_MS);
      forceExit.unref();

      await prisma.$disconnect().catch(() => {});
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
    process.on("unhandledRejection", (reason) => {
      console.error("Unhandled promise rejection:", reason);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

bootstrap();
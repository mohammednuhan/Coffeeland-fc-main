import { getMe, login, registerAdmin } from "../controllers/auth.controller";
import { env } from "../config/env";
import { rateLimit } from "../middleware/cors.middleware";
import { requireAuth } from "../middleware/auth.middleware";
import type { Route } from "../types";

export const authRoutes: Route[] = [
  {
    method: "POST",
    path: "/api/auth/register",
    handler: registerAdmin,
    middleware: [rateLimit("auth-register", env.AUTH_RATE_LIMIT_MAX_REQUESTS)],
  },
  {
    method: "POST",
    path: "/api/auth/login",
    handler: login,
    middleware: [rateLimit("auth-login", env.AUTH_RATE_LIMIT_MAX_REQUESTS)],
  },
  { method: "GET", path: "/api/auth/me", handler: getMe, middleware: [requireAuth] },
];
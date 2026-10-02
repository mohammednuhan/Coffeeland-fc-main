import { getMe, login, registerAdmin } from "../controllers/auth.controller.js";
import { env } from "../config/env.js";
import { rateLimit } from "../middleware/cors.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import type { Route } from "../types/index.js";

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
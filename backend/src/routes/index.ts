import { authRoutes } from "./auth.routes";
import { contactRoutes } from "./contact.routes";
import { studentRoutes } from "./student.routes";
import type { Route } from "../types";
import { ok } from "../utils/response";

export const routes: Route[] = [
  ...authRoutes,
  ...studentRoutes,
  ...contactRoutes,
  {
    method: "GET",
    path: "/api/health",
    handler: () =>
      ok({
        status: "ok",
        service: "coffeelandfc-backend",
        time: new Date().toISOString(),
      }),
  },
];
import {
  deleteStudent,
  getStudent,
  getStudents,
  registerStudent,
  updateStudent,
} from "../controllers/student.controller.js";
import { rateLimit } from "../middleware/cors.middleware.js";
import { requireAuth, requireRoles } from "../middleware/auth.middleware.js";
import type { Route } from "../types/index.js";

export const studentRoutes: Route[] = [
  {
    method: "POST",
    path: "/api/register",
    handler: registerStudent,
    middleware: [rateLimit("register", 10)],
  },
  {
    method: "GET",
    path: "/api/students",
    handler: getStudents,
    middleware: [requireAuth, requireRoles("admin", "superadmin")],
  },
  {
    method: "GET",
    path: "/api/students/:id",
    handler: getStudent,
    middleware: [requireAuth, requireRoles("admin", "superadmin")],
  },
  {
    method: "PATCH",
    path: "/api/students/:id",
    handler: updateStudent,
    middleware: [requireAuth, requireRoles("admin", "superadmin")],
  },
  {
    method: "DELETE",
    path: "/api/students/:id",
    handler: deleteStudent,
    middleware: [requireAuth, requireRoles("superadmin")],
  },
];
import {
  deleteStudent,
  getStudent,
  getStudents,
  registerStudent,
  updateStudent,
} from "../controllers/student.controller";
import { rateLimit } from "../middleware/cors.middleware";
import { requireAuth, requireRoles } from "../middleware/auth.middleware";
import type { Route } from "../types";

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
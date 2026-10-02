import { createContact, deleteContact, getContacts } from "../controllers/contact.controller.js";
import { rateLimit } from "../middleware/cors.middleware.js";
import { requireAuth, requireRoles } from "../middleware/auth.middleware.js";
import type { Route } from "../types/index.js";

export const contactRoutes: Route[] = [
  {
    method: "POST",
    path: "/api/contact",
    handler: createContact,
    middleware: [rateLimit("contact")],
  },
  {
    method: "GET",
    path: "/api/contacts",
    handler: getContacts,
    middleware: [requireAuth, requireRoles("admin", "superadmin")],
  },
  {
    method: "DELETE",
    path: "/api/contacts/:id",
    handler: deleteContact,
    middleware: [requireAuth, requireRoles("superadmin")],
  },
];
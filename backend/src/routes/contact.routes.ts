import { createContact, deleteContact, getContacts } from "../controllers/contact.controller";
import { rateLimit } from "../middleware/cors.middleware";
import { requireAuth, requireRoles } from "../middleware/auth.middleware";
import type { Route } from "../types";

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
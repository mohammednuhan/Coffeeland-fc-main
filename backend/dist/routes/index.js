import { authRoutes } from "./auth.routes";
import { contactRoutes } from "./contact.routes";
import { studentRoutes } from "./student.routes";
import { ok } from "../utils/response";
export const routes = [
    ...authRoutes,
    ...studentRoutes,
    ...contactRoutes,
    {
        method: "GET",
        path: "/api/health",
        handler: () => ok({
            status: "ok",
            service: "coffeelandfc-backend",
            time: new Date().toISOString(),
        }),
    },
];
//# sourceMappingURL=index.js.map
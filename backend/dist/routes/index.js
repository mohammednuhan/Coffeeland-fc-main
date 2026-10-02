import { authRoutes } from "./auth.routes.js";
import { contactRoutes } from "./contact.routes.js";
import { studentRoutes } from "./student.routes.js";
import { ok } from "../utils/response.js";
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
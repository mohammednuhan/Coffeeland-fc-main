import { verifyToken } from "../utils/jwt.js";
import { forbidden, unauthorized } from "../utils/response.js";
/**
 * Authentication middleware — prevents access to protected routes unless a valid
 * `Authorization: Bearer <token>` header is present.
 */
export const requireAuth = async (ctx, next) => {
    const header = ctx.req.headers.get("Authorization");
    if (!header || !header.startsWith("Bearer ")) {
        return unauthorized("Authentication required");
    }
    const token = header.slice("Bearer ".length).trim();
    const payload = await verifyToken(token);
    if (!payload) {
        return unauthorized("Invalid or expired token");
    }
    const id = Number(payload.sub);
    if (!Number.isInteger(id)) {
        return unauthorized("Invalid or expired token");
    }
    ctx.user = {
        id,
        username: payload.username,
        email: payload.email,
        role: payload.role,
    };
    return next();
};
/**
 * Authorization middleware — restricts a route to specific roles.
 * Must run after `requireAuth`.
 */
export const requireRoles = (...roles) => async (ctx, next) => {
    if (!ctx.user) {
        return unauthorized("Authentication required");
    }
    if (!roles.includes(ctx.user.role)) {
        return forbidden("Forbidden: insufficient permissions");
    }
    return next();
};
//# sourceMappingURL=auth.middleware.js.map
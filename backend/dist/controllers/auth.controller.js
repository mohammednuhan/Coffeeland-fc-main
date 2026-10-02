import { env } from "../config/env.js";
import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { signToken } from "../utils/jwt.js";
import { hashPassword, verifyPassword } from "../utils/password.js";
import { created, ok } from "../utils/response.js";
import { asString, isEmail, parseBody } from "../utils/validate.js";
function keysMatch(provided, expected) {
    if (provided.length !== expected.length)
        return false;
    let diff = 0;
    for (let i = 0; i < provided.length; i++) {
        diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
}
export async function registerAdmin(ctx) {
    if (!env.ADMIN_REGISTER_KEY) {
        throw new AppError("Admin registration is disabled. Set ADMIN_REGISTER_KEY to enable it.", 503);
    }
    const body = await parseBody(ctx.req);
    const key = asString(body.key);
    if (!keysMatch(key, env.ADMIN_REGISTER_KEY)) {
        throw new AppError("Invalid registration key", 403);
    }
    const username = asString(body.username);
    const email = asString(body.email).toLowerCase();
    const password = asString(body.password);
    if (!username || !email || !password) {
        throw new AppError("Username, email and password are required", 400);
    }
    if (!isEmail(email)) {
        throw new AppError("Invalid email address", 400);
    }
    if (password.length < 10) {
        throw new AppError("Password must be at least 10 characters", 400);
    }
    const existing = await prisma.admin.findFirst({
        where: { OR: [{ username }, { email }] },
    });
    if (existing) {
        throw new AppError("Username or email already registered", 409);
    }
    const hashed = await hashPassword(password);
    const admin = await prisma.admin.create({
        data: { username, email, password: hashed, role: "admin" },
        select: { id: true, username: true, email: true, role: true, createdAt: true },
    });
    return created({ message: "Admin registered successfully", admin });
}
export async function login(ctx) {
    const body = await parseBody(ctx.req);
    const email = asString(body.email).toLowerCase();
    const password = asString(body.password);
    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }
    const admin = await prisma.admin.findUnique({
        where: { email },
        select: { id: true, username: true, email: true, password: true, role: true, createdAt: true },
    });
    if (!admin) {
        throw new AppError("Invalid credentials", 401);
    }
    const valid = await verifyPassword(password, admin.password);
    if (!valid) {
        throw new AppError("Invalid credentials", 401);
    }
    const token = await signToken({
        sub: String(admin.id),
        username: admin.username,
        email: admin.email,
        role: admin.role,
    });
    return ok({
        message: "Login successful",
        token,
        admin: { id: admin.id, username: admin.username, email: admin.email, role: admin.role, createdAt: admin.createdAt },
    });
}
export async function getMe(ctx) {
    return ok({ user: ctx.user });
}
//# sourceMappingURL=auth.controller.js.map
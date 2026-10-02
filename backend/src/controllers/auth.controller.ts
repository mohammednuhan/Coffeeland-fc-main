import { env } from "../config/env";
import { prisma } from "../config/prisma";
import type { RouteContext } from "../types";
import { AppError } from "../utils/errors";
import { signToken } from "../utils/jwt";
import { hashPassword, verifyPassword } from "../utils/password";
import { created, ok } from "../utils/response";
import { asString, isEmail, parseBody } from "../utils/validate";

type RegisterBody = { username?: string; email?: string; password?: string; key?: string };
type LoginBody = { email?: string; password?: string };

function keysMatch(provided: string, expected: string): boolean {
  if (provided.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < provided.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export async function registerAdmin(ctx: RouteContext): Promise<Response> {
  if (!env.ADMIN_REGISTER_KEY) {
    throw new AppError(
      "Admin registration is disabled. Set ADMIN_REGISTER_KEY to enable it.",
      503
    );
  }

  const body = await parseBody<RegisterBody>(ctx.req);

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

export async function login(ctx: RouteContext): Promise<Response> {
  const body = await parseBody<LoginBody>(ctx.req);
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

export async function getMe(ctx: RouteContext): Promise<Response> {
  return ok({ user: ctx.user });
}
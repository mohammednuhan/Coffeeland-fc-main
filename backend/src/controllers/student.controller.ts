import { prisma } from "../config/prisma";
import type { Prisma } from "@prisma/client";
import type { RouteContext, Middleware } from "../types";
import { AppError } from "../utils/errors";
import { hashPassword } from "../utils/password";
import { created, noContent, notFound, ok } from "../utils/response";
import { asBool, asInt, asString, isEmail, parseBody } from "../utils/validate";

type RegisterBody = {
  name?: string;
  age?: string | number;
  email?: string;
  password?: string;
  message?: string;
  location?: string;
};

export const registerStudent: Middleware = async (ctx) => {
  const body = await parseBody<RegisterBody>(ctx.req);

  const name = asString(body.name);
  const age = asInt(body.age);
  const email = asString(body.email).toLowerCase();
  const password = asString(body.password);
  const message = asString(body.message);
  const location = asString(body.location) || "Chikmagalur";

  if (!name || age === undefined || !email) {
    throw new AppError("Name, age and email are required", 400);
  }
  if (!isEmail(email)) {
    throw new AppError("Invalid email address", 400);
  }

  const hashed = password ? await hashPassword(password) : "";
  const date = new Date().toISOString().split("T")[0];

  const student = await prisma.student.create({
    data: {
      name,
      age,
      email,
      password: hashed,
      message,
      location,
      paid: false,
      date,
    },
  });

  return created({
    message: "Registration successful",
    student: {
      id: student.id,
      name: student.name,
      age: student.age,
      email: student.email,
      location: student.location,
      paid: student.paid,
      date: student.date,
      createdAt: student.createdAt,
    },
  });
};

export const getStudents: Middleware = async (ctx) => {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      age: true,
      email: true,
      location: true,
      paid: true,
      date: true,
      createdAt: true,
    },
  });

  return ok({ count: students.length, students });
};

export const getStudent: Middleware = async (ctx) => {
  const id = asInt(ctx.params.id);
  if (id === undefined || !Number.isInteger(id)) {
    throw new AppError("Invalid student id", 400);
  }

  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) {
    return notFound("Student not found");
  }

  const { password: _password, ...safe } = student;
  return ok({ student: safe });
};

type UpdateBody = {
  name?: string;
  age?: string | number;
  email?: string;
  message?: string;
  location?: string;
  paid?: boolean | string;
};

export const updateStudent: Middleware = async (ctx) => {
  const id = asInt(ctx.params.id);
  if (id === undefined || !Number.isInteger(id)) {
    throw new AppError("Invalid student id", 400);
  }

  const body = await parseBody<UpdateBody>(ctx.req);

  const data: Prisma.StudentUpdateInput = {};
  if (body.name !== undefined) data.name = asString(body.name);
  if (body.age !== undefined) {
    const age = asInt(body.age);
    if (age === undefined) throw new AppError("Invalid age", 400);
    data.age = age;
  }
  if (body.email !== undefined) {
    const email = asString(body.email).toLowerCase();
    if (!isEmail(email)) throw new AppError("Invalid email address", 400);
    data.email = email;
  }
  if (body.message !== undefined) data.message = asString(body.message);
  if (body.location !== undefined) data.location = asString(body.location);
  if (body.paid !== undefined) data.paid = asBool(body.paid);

  const student = await prisma.student.update({
    where: { id },
    data,
  });

  const { password: _password, ...safe } = student;
  return ok({ message: "Student updated", student: safe });
};

export const deleteStudent: Middleware = async (ctx) => {
  const id = asInt(ctx.params.id);
  if (id === undefined || !Number.isInteger(id)) {
    throw new AppError("Invalid student id", 400);
  }

  await prisma.student
    .delete({ where: { id } })
    .catch(() => {
      throw new AppError("Student not found", 404);
    });

  return noContent();
};
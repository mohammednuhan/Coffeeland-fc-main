import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { hashPassword } from "../utils/password.js";
import { created, noContent, notFound, ok } from "../utils/response.js";
import { asBool, asInt, asString, isEmail, parseBody } from "../utils/validate.js";
export const registerStudent = async (ctx) => {
    const body = await parseBody(ctx.req);
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
export const getStudents = async (ctx) => {
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
export const getStudent = async (ctx) => {
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
export const updateStudent = async (ctx) => {
    const id = asInt(ctx.params.id);
    if (id === undefined || !Number.isInteger(id)) {
        throw new AppError("Invalid student id", 400);
    }
    const body = await parseBody(ctx.req);
    const data = {};
    if (body.name !== undefined)
        data.name = asString(body.name);
    if (body.age !== undefined) {
        const age = asInt(body.age);
        if (age === undefined)
            throw new AppError("Invalid age", 400);
        data.age = age;
    }
    if (body.email !== undefined) {
        const email = asString(body.email).toLowerCase();
        if (!isEmail(email))
            throw new AppError("Invalid email address", 400);
        data.email = email;
    }
    if (body.message !== undefined)
        data.message = asString(body.message);
    if (body.location !== undefined)
        data.location = asString(body.location);
    if (body.paid !== undefined)
        data.paid = asBool(body.paid);
    const student = await prisma.student.update({
        where: { id },
        data,
    });
    const { password: _password, ...safe } = student;
    return ok({ message: "Student updated", student: safe });
};
export const deleteStudent = async (ctx) => {
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
//# sourceMappingURL=student.controller.js.map
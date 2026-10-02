import { prisma } from "../config/prisma.js";
import { AppError } from "../utils/errors.js";
import { created, noContent, ok } from "../utils/response.js";
import { sendTelegramRegistration } from "../utils/telegram.js";
import { asInt, asString, isEmail, parseBody } from "../utils/validate.js";
export const createContact = async (ctx) => {
    const body = await parseBody(ctx.req);
    const name = asString(body.name);
    const email = asString(body.email).toLowerCase();
    const phone = asString(body.phone);
    const inquiry = asString(body.inquiry) || "academy";
    const message = asString(body.message);
    const ageGroup = asString(body.ageGroup);
    const location = asString(body.location);
    const batch = asString(body.batch);
    const guardianName = asString(body.guardianName);
    const dob = asString(body.dob);
    const position = asString(body.position);
    const experience = asString(body.experience);
    if (!name || !email || !phone || !ageGroup || !location || !batch) {
        throw new AppError("Name, email, phone, age group, location and batch are required", 400);
    }
    if (!isEmail(email)) {
        throw new AppError("Invalid email address", 400);
    }
    const date = new Date().toISOString().split("T")[0];
    const storedMessage = [
        `Guardian: ${guardianName || "-"}`,
        `DOB: ${dob || "-"}`,
        `Position: ${position || "-"}`,
        `Experience: ${experience || "-"}`,
        `Message: ${message || "-"}`,
    ].join(" | ");
    const contact = await prisma.contact.create({
        data: {
            name,
            email,
            phone,
            inquiry,
            message: storedMessage,
            ageGroup,
            location,
            batch,
            date,
        },
    });
    const telegramSent = await sendTelegramRegistration({
        name,
        email,
        phone,
        ageGroup,
        location,
        batch,
        guardianName,
        dob,
        position,
        experience,
        message,
    });
    return created({
        message: telegramSent
            ? "Registration received, thank you!"
            : "Registration saved, but we could not reach our Telegram right now. Please call us.",
        telegramSent,
        contact: { id: contact.id, date: contact.date },
    });
};
export const getContacts = async (ctx) => {
    const page = Math.max(1, Number(ctx.query.get("page") ?? "1") || 1);
    const pageSize = Math.min(100, Math.max(1, Number(ctx.query.get("limit") ?? "50") || 50));
    const [contacts, total] = await Promise.all([
        prisma.contact.findMany({
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.contact.count(),
    ]);
    return ok({ count: total, page, pageSize, contacts });
};
export const deleteContact = async (ctx) => {
    const id = asInt(ctx.params.id);
    if (id === undefined || !Number.isInteger(id)) {
        throw new AppError("Invalid contact id", 400);
    }
    await prisma.contact
        .delete({ where: { id } })
        .catch(() => {
        throw new AppError("Contact not found", 404);
    });
    return noContent();
};
//# sourceMappingURL=contact.controller.js.map
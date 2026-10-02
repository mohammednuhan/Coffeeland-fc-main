import { AppError } from "./errors.js";
export async function parseBody(req) {
    try {
        const body = await req.json();
        if (body === null || typeof body !== "object") {
            throw new AppError("Request body must be a JSON object", 400);
        }
        return body;
    }
    catch (error) {
        if (error instanceof AppError)
            throw error;
        throw new AppError("Invalid JSON body", 400);
    }
}
export function asString(value) {
    return typeof value === "string" ? value.trim() : "";
}
export function asInt(value) {
    if (value === undefined || value === null || value === "")
        return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
}
export function asBool(value) {
    if (typeof value === "boolean")
        return value;
    if (typeof value === "string")
        return value === "true" || value === "1";
    return Boolean(value);
}
export function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
//# sourceMappingURL=validate.js.map
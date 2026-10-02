import { env } from "../config/env.js";
const TELEGRAM_TIMEOUT_MS = 8000;
function escapeHtml(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function line(label, value) {
    return `<b>${label}:</b> ${escapeHtml(value || "-")}`;
}
function buildMessage(details) {
    return [
        "<b>⚽ New Academy Registration</b>",
        "",
        line("Player", details.name),
        line("Guardian", details.guardianName ?? ""),
        line("Phone", details.phone),
        line("Email", details.email),
        line("DOB", details.dob ?? ""),
        line("Age Group", details.ageGroup),
        line("Position", details.position ?? ""),
        line("Location", details.location),
        line("Batch", details.batch),
        line("Experience", details.experience ?? ""),
        "",
        `<b>Message:</b> ${escapeHtml(details.message ?? "-")}`,
    ].join("\n");
}
export function isTelegramConfigured() {
    return Boolean(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID);
}
export async function sendTelegramRegistration(details) {
    if (!isTelegramConfigured()) {
        console.error("[telegram] Not configured: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID. Registration was NOT delivered.");
        return false;
    }
    try {
        const res = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: env.TELEGRAM_CHAT_ID,
                text: buildMessage(details),
                parse_mode: "HTML",
                disable_web_page_preview: true,
            }),
            signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
        });
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            console.error(`[telegram] Failed (${res.status}): ${body}`);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error("[telegram] Request failed:", error);
        return false;
    }
}
//# sourceMappingURL=telegram.js.map
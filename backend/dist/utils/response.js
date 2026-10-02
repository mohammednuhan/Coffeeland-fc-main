export const CORS_HEADERS = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
};
export const SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-DNS-Prefetch-Control": "on",
};
export function json(data, status = 200, extraHeaders = {}) {
    const body = JSON.stringify(data);
    return new Response(body, {
        status,
        headers: {
            "Content-Type": "application/json",
            ...SECURITY_HEADERS,
            ...extraHeaders,
        },
    });
}
export function ok(data, extraHeaders) {
    return json(data, 200, extraHeaders);
}
export function created(data, extraHeaders) {
    return json(data, 201, extraHeaders);
}
export function noContent(extraHeaders) {
    return new Response(null, {
        status: 204,
        headers: { ...SECURITY_HEADERS, ...extraHeaders },
    });
}
export function unauthorized(message = "Unauthorized") {
    return json({ error: message }, 401);
}
export function forbidden(message = "Forbidden") {
    return json({ error: message }, 403);
}
export function notFound(message = "Not found") {
    return json({ error: message }, 404);
}
export function tooManyRequests(message = "Too many requests") {
    return json({ error: message }, 429, { "Retry-After": "60" });
}
//# sourceMappingURL=response.js.map
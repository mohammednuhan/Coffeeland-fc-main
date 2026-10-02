import { env } from "../config/env.js";
import type { Middleware } from "../types.js";
import { CORS_HEADERS, SECURITY_HEADERS, json, tooManyRequests } from "../utils/response.js";
import { AppError } from "../utils/errors.js";

const DEFAULT_SECURITY_HEADERS: Record<string, string> = SECURITY_HEADERS;

/**
 * CORS handling. Preflight (OPTIONS) requests are answered immediately.
 * When CORS_ORIGINS is configured, only those origins are allowed.
 * With no configuration the API is same-origin only (no Access-Control-Allow-Origin).
 */
export function handleCors(req: Request): Response | null {
  const origin = req.headers.get("Origin");

  const corsHeaders: Record<string, string> = { ...CORS_HEADERS };
  if (env.CORS_ORIGINS.length > 0 && origin && env.CORS_ORIGINS.includes(origin)) {
    corsHeaders["Access-Control-Allow-Origin"] = origin;
    corsHeaders.Vary = "Origin";
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  return null;
}

export function securityHeaders(): Record<string, string> {
  return { ...DEFAULT_SECURITY_HEADERS };
}

/**
 * Central error handler — converts thrown errors into JSON responses.
 */
export function handleError(error: unknown): Response {
  if (error instanceof AppError) {
    return json(
      {
        error: error.message,
        ...(error.details !== undefined ? { details: error.details } : {}),
      },
      error.status,
      securityHeaders()
    );
  }

  if (error instanceof SyntaxError) {
    return json({ error: "Invalid JSON body" }, 400, securityHeaders());
  }

  if (error instanceof Error) {
    console.error("Unhandled error:", error);
    return json({ error: "Internal server error" }, 500, securityHeaders());
  }

  return json({ error: "Internal server error" }, 500, securityHeaders());
}

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientKey(req: Request): string {
  const forwarded = req.headers.get("X-Forwarded-For");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("X-Real-IP") ?? "unknown";
}

function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > max;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (now > bucket.resetAt) buckets.delete(key);
  }
}, 60_000).unref();

/**
 * Fixed-window rate limiter keyed by client IP and route group.
 * Usable as route middleware.
 */
export const rateLimit =
  (scope: string, max?: number): Middleware =>
  async (ctx, next) => {
    const limit = max ?? env.RATE_LIMIT_MAX_REQUESTS;
    const key = `${scope}:${clientKey(ctx.req)}`;

    if (isRateLimited(key, limit, env.RATE_LIMIT_WINDOW_MS)) {
      return tooManyRequests("Too many requests. Please try again later.");
    }
    return next();
  };

/**
 * Simple request logger middleware. Silent in production.
 */
export function logger(
  next: () => Promise<Response> | Response,
  req: Request
): Promise<Response> {
  if (env.NODE_ENV === "production") {
    return Promise.resolve(next());
  }

  const start = performance.now();
  return Promise.resolve(next()).then((res) => {
    const ms = (performance.now() - start).toFixed(1);
    console.log(
      `${new Date().toISOString()} ${req.method} ${new URL(req.url).pathname} ${res.status} (${ms}ms)`
    );
    return res;
  });
}
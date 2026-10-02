import type { IncomingMessage, ServerResponse } from "node:http";
import { Readable } from "node:stream";
import { createServer as createHttpServer } from "node:http";
import { env } from "./config/env";
import { handleCors, handleError, logger } from "./middleware/cors.middleware";
import { routes } from "./routes";
import type { HttpMethod, Middleware, Next, Route, RouteContext } from "./types";
import { notFound, tooManyRequests } from "./utils/response";

const terminalNext: Next = async () =>
  new Response(JSON.stringify({ error: "Unhandled request" }), {
    status: 500,
    headers: { "Content-Type": "application/json" },
  });

function toWebHeaders(raw: Record<string, string | string[] | undefined>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (v === undefined) continue;
    out[k] = Array.isArray(v) ? v.join(", ") : v;
  }
  return out;
}

async function sendWebResponse(res: ServerResponse, response: Response) {
  res.statusCode = response.status;
  for (const [k, v] of response.headers.entries()) {
    res.setHeader(k, v);
  }
  if (response.body) {
    const buf = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Length", buf.length);
    res.end(buf);
  } else {
    res.end();
  }
}

function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const patternSegs = pattern.split("/").filter(Boolean);
  const pathSegs = pathname.split("/").filter(Boolean);

  if (patternSegs.length !== pathSegs.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegs.length; i++) {
    const seg = patternSegs[i];
    const value = pathSegs[i];
    if (seg === undefined || value === undefined) return null;
    if (seg.startsWith(":")) {
      params[seg.slice(1)] = decodeURIComponent(value);
    } else if (seg !== value) {
      return null;
    }
  }
  return params;
}

function compose(route: Route): Middleware {
  const chain = [...(route.middleware ?? []), route.handler];

  const dispatch = (index: number): Middleware => (ctx, _next) => {
    const mw = chain[index];
    if (!mw) {
      return new Response(JSON.stringify({ error: "Unhandled request" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = mw(ctx, () => {
      const nextResult = dispatch(index + 1)(ctx, terminalNext);
      return nextResult instanceof Promise ? nextResult : Promise.resolve(nextResult);
    });

    return result instanceof Promise ? result : Promise.resolve(result);
  };

  return dispatch(0);
}

function findRoute(method: HttpMethod, pathname: string) {
  for (const route of routes) {
    if (route.method !== method) continue;
    if (route.path === pathname) return { route, params: {} };
    const params = matchPath(route.path, pathname);
    if (params) return { route, params };
  }
  return null;
}

function getClientIp(headers: Record<string, string | string[] | undefined>): string {
  const forwarded = headers["x-forwarded-for"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (raw) return raw.split(",")[0]?.trim() ?? "unknown";
  return "unknown";
}

type GlobalBucket = { count: number; resetAt: number };

const globalBuckets = new Map<string, GlobalBucket>();

function isGloballyLimited(ip: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = globalBuckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    globalBuckets.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > max;
}

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of globalBuckets) {
    if (now > bucket.resetAt) globalBuckets.delete(key);
  }
}, 60_000).unref();

export function createServer() {
  return createHttpServer(async (nodeReq: IncomingMessage, nodeRes: ServerResponse) => {
    try {
      const host = nodeReq.headers.host ?? "localhost";
      const url = new URL(nodeReq.url ?? "/", `http://${host}`);

      const hasBody = nodeReq.method !== "GET" && nodeReq.method !== "HEAD";

      const webReq = new Request(url, {
        method: nodeReq.method,
        headers: toWebHeaders(nodeReq.headers as Record<string, string | string[] | undefined>),
        ...(hasBody
          ? { body: Readable.toWeb(nodeReq) as unknown as ReadableStream, duplex: "half" }
          : {}),
      } as RequestInit & { duplex?: string });

      const corsResponse = handleCors(webReq);
      if (corsResponse) {
        await sendWebResponse(nodeRes, corsResponse);
        return;
      }

      if (nodeReq.method !== "OPTIONS") {
        const ip = getClientIp(
          nodeReq.headers as Record<string, string | string[] | undefined>
        );
        if (isGloballyLimited(ip, env.RATE_LIMIT_MAX_REQUESTS * 10, env.RATE_LIMIT_WINDOW_MS)) {
          await sendWebResponse(nodeRes, tooManyRequests());
          return;
        }
      }

      const matched = findRoute(webReq.method as HttpMethod, url.pathname);

      if (!matched) {
        const resp = notFound(`Route ${webReq.method} ${url.pathname} not found`);
        await sendWebResponse(nodeRes, resp);
        return;
      }

      const ctx: RouteContext = {
        req: webReq,
        params: matched.params,
        query: url.searchParams,
      };

      const handler = compose(matched.route);

      const response = await logger(
        () => handler(ctx, terminalNext),
        webReq
      );

      await sendWebResponse(nodeRes, response);
    } catch (error) {
      await sendWebResponse(nodeRes, handleError(error));
    }
  });
}
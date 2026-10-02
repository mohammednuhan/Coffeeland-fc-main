export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface AuthenticatedUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
  iss?: string;
}

export interface RouteContext {
  req: Request;
  params: Record<string, string>;
  query: URLSearchParams;
  user?: AuthenticatedUser;
}

export type Next = () => Promise<Response>;

export type Middleware = (ctx: RouteContext, next: Next) => Promise<Response> | Response;

export interface Route {
  method: HttpMethod;
  path: string;
  handler: Middleware;
  middleware?: Middleware[];
}
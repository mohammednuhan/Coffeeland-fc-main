import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env.js";
import type { JwtPayload } from "../types.js";

const encoder = new TextEncoder();
const ISSUER = "coffeelandfc";

function secretKey(): Uint8Array {
  return encoder.encode(env.JWT_SECRET);
}

export async function signToken(
  payload: Omit<JwtPayload, "iat" | "exp" | "iss">,
  expiresIn: string = env.JWT_EXPIRES_IN
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey());
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      issuer: ISSUER,
      algorithms: ["HS256"],
    });
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}
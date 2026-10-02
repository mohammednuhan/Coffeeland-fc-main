import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env.js";
const encoder = new TextEncoder();
const ISSUER = "coffeelandfc";
function secretKey() {
    return encoder.encode(env.JWT_SECRET);
}
export async function signToken(payload, expiresIn = env.JWT_EXPIRES_IN) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuer(ISSUER)
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .sign(secretKey());
}
export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, secretKey(), {
            issuer: ISSUER,
            algorithms: ["HS256"],
        });
        return payload;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=jwt.js.map
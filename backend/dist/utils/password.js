import bcrypt from "bcryptjs";
const SALT_ROUNDS = 12;
export async function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS);
}
export async function verifyPassword(plain, hash) {
    try {
        return bcrypt.compare(plain, hash);
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=password.js.map
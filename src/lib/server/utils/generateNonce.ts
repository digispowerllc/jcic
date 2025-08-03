import crypto from "crypto";

export function generateNonce() {
    return crypto.randomBytes(16).toString("base64");
}

export function generateNonceHex() {
    return crypto.randomBytes(16).toString("hex");
}

export function generateNonceUrlSafe() {
    return crypto.randomBytes(16).toString("base64url");
}

export function generateNonceUrlSafeHex() {
    return crypto.randomBytes(16).toString("base64url").replace(/=/g, "");
}

export function generateNonceUrlSafeShort() {
    return crypto.randomBytes(8).toString("base64url").replace(/=/g, "");
}

export function generateNonceUrlSafeShortHex() {
    return crypto.randomBytes(8).toString("base64url").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
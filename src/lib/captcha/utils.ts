// src/lib/captcha/utils.ts
export function isMobile(userAgent: string): boolean {
	return /Mobi|Android/i.test(userAgent);
}

export function isSuspiciousIP(ip: string): boolean {
	const riskyIps = ['127.0.0.2', '10.0.0.66'];
	return riskyIps.includes(ip);
}

export function generateToken(): string {
	return crypto.randomUUID();
}

export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

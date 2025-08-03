// src/lib/server/utils/csrf.ts
import { randomBytes, timingSafeEqual } from 'crypto';
import type { RequestEvent } from '@sveltejs/kit';

const CSRF_COOKIE = 'csrfToken';
const CSRF_HEADER = 'x-csrf-token';
const CSRF_MAX_AGE = 60 * 60; // 1 hour

export function generateCsrfToken(): string {
	return randomBytes(32).toString('hex');
}

export function ensureCsrfCookie(event: RequestEvent): string {
	let stored = event.cookies.get(CSRF_COOKIE);

	if (!stored) {
		stored = generateCsrfToken();
		event.cookies.set(CSRF_COOKIE, stored, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // ⚠️ Set to true in production
			maxAge: CSRF_MAX_AGE
		});
		console.log('[CSRF] Issued new cookie token:', stored);
	} else {
		console.log('[CSRF] Existing cookie token:', stored);
	}

	event.locals.csrfToken = stored;
	return stored;
}

export async function getSubmittedToken(event: RequestEvent): Promise<string | null> {
	const fromHeader = event.request.headers.get(CSRF_HEADER);
	if (fromHeader) return fromHeader;

	const type = event.request.headers.get('content-type') || '';

	try {
		if (type.includes('application/json')) {
			const body = await event.request.clone().json();
			return body.csrfToken || null;
		}

		if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
			const form = await event.request.clone().formData();
			return form.get('csrfToken')?.toString() || null;
		}
	} catch (err) {
		console.warn('[CSRF] Unable to parse submitted token:', err);
	}
	return null;
}

export function verifyCsrf(stored: string | null, submitted: string | null): boolean {
	if (!stored || !submitted) return false;

	const a = Buffer.from(stored);
	const b = Buffer.from(submitted);
	return a.length === b.length && timingSafeEqual(a, b);
}

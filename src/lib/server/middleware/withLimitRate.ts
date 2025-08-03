// src/hooks/withRateLimit.ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

type RateLimitEntry = {
	count: number;
	resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const DEFAULT_MAX_REQUESTS = 100;

const ROUTE_LIMITS: Record<string, number> = {
	'/api/login': 10,
	'/api/report': 20,
	'/api/alert': 30,
	'api/auth/otp': 5
};

const rateMap = new Map<string, RateLimitEntry>();

// ✅ Run cleanup every 5 minutes in both dev and prod
setInterval(
	() => {
		const now = Date.now();
		for (const [key, entry] of rateMap.entries()) {
			if (entry.resetAt < now) rateMap.delete(key);
		}
	},
	5 * 60 * 1000
); // 5 minutes

import type { RequestEvent } from '@sveltejs/kit';

function getClientIdentifier(event: RequestEvent) {
	// 🏠 Define recognized local IPs and ports
	// 🛡️ Define allowed origins (adjust based on environment)
	const allowedOrigins = new Set(
		(env.ALLOWED_ORIGINS || '').split(',').map((origin) => origin.trim())
	);

	// 🔍 Extract client IP
	const rawIp =
		event.request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
		event.getClientAddress?.() ||
		'192.168.0.159:4173'; // Default fallback

	// 🛠️ Normalize IP format (handle ports dynamically)
	const [ip, port] = rawIp.split(':');
	const normalizedIp = allowedOrigins.has(ip) ? `${ip}:${port || '{PORT}'}` : rawIp;

	// 👤 Identify user or fallback to IP
	if (
		event.locals?.user &&
		typeof event.locals.user === 'object' &&
		'id' in event.locals.user
	) {
		// @ts-expect-error: user is assumed to have an id property
		return `user:${event.locals.user.id}`;
	}
	return `ip:${normalizedIp}`;
}
function getLimitForRoute(pathname: string): number {
	for (const route in ROUTE_LIMITS) {
		if (pathname.startsWith(route)) return ROUTE_LIMITS[route];
	}
	return DEFAULT_MAX_REQUESTS;
}

export const withLimitRate: Handle = async ({ event, resolve }) => {
	const now = Date.now();
	const key = getClientIdentifier(event);
	const limit = getLimitForRoute(event.url.pathname);

	let entry = rateMap.get(key);

	if (!entry || now > entry.resetAt) {
		entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
		rateMap.set(key, entry);
	} else {
		entry.count++;
		if (entry.count > limit) {
			const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
			return new Response(
				JSON.stringify({ error: 'Too many requests. Please wait and try again.' }),
				{
					status: 429,
					headers: {
						'Content-Type': 'application/json',
						'Retry-After': retryAfter.toString(),
						'X-RateLimit-Limit': limit.toString(),
						'X-RateLimit-Remaining': '0',
						'X-RateLimit-Reset': entry.resetAt.toString()
					}
				}
			);
		}
	}

	const remaining = limit - entry.count;
	const response = await resolve(event);

	response.headers.set('X-RateLimit-Limit', limit.toString());
	response.headers.set('X-RateLimit-Remaining', remaining.toString());
	response.headers.set('X-RateLimit-Reset', entry.resetAt.toString());

	return response;
};

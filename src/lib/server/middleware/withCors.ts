// src/lib/server/middleware/withCors.ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const ALLOWED_ORIGINS = (env.ALLOWED_ORIGINS || '')
	.split(',')
	.map((origin) => origin.trim().toLowerCase())
	.filter(Boolean);

export const withCors: Handle = async ({ event, resolve }) => {
	const origin = event.request.headers.get('origin')?.toLowerCase() ?? '';
	const method = event.request.method;
	const url = event.url.toString();

	let isAllowedOrigin = false;

	if (origin) {
		try {
			const hostname = new URL(origin).hostname.toLowerCase();
			isAllowedOrigin = ALLOWED_ORIGINS.some(
				(allowed) => origin.includes(allowed) || hostname === allowed
			);
		} catch {
			console.warn(`[withCors] Invalid Origin header: ${origin}`);
		}
	}

	if (!origin) {
		console.warn(`[withCors] Missing Origin header for: ${method} ${url}`);
	} else if (!isAllowedOrigin) {
		console.warn(`[withCors] BLOCKED ORIGIN: ${origin} for ${method} ${url}`);
	}

	// Preflight request
	if (method === 'OPTIONS') {
		const headers = new Headers();
		if (origin && isAllowedOrigin) {
			headers.set('Access-Control-Allow-Origin', origin);
			headers.set('Access-Control-Allow-Credentials', 'true');
			headers.set(
				'Access-Control-Allow-Headers',
				'Content-Type, Authorization, X-CSRF-Token, x-device-id'
			);
			headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			headers.set('Vary', 'Origin');
		}
		return new Response(null, { status: 204, headers });
	}

	// Resolve normal request
	const response = await resolve(event);

	if (origin && isAllowedOrigin) {
		response.headers.set('Access-Control-Allow-Origin', origin);
		response.headers.set('Access-Control-Allow-Credentials', 'true');
		response.headers.set(
			'Access-Control-Allow-Headers',
			'Content-Type, Authorization, X-CSRF-Token, x-device-id'
		);
		response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		response.headers.set('Vary', 'Origin');
	}
	console.info(`[withCors] COR Checkpoint passed`);
	return response;
};

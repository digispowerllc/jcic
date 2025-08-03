// src/hooks/withSecurityAndCsp.ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import crypto from 'crypto';

// ✅ Allowlisted origins
const allowedOrigins = new Set(
	env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) ?? []
);

// ✅ Check for dev LAN
function isDevHost(hostname: string): boolean {
	const isLanDev = /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname);
	return allowedOrigins.has(hostname) || isLanDev;
}

export const withSecurityAndCsp: Handle = async ({ event, resolve }) => {
	const hostname = event.url.hostname;
	const protocol = event.url.protocol;
	const isDevEnv = import.meta.env.DEV;
	const isDevHostMatch = isDevHost(hostname);

	// ✅ Nonce for CSP
	const nonce = crypto.randomBytes(32).toString('base64url');
	event.locals.nonce = nonce;

	const localOrigin = isDevHostMatch ? `https://${hostname}` : undefined;

	const routeOverrides: Record<string, Partial<Record<string, string>>> = {
		'/map-page': {
			'worker-src': `'self' blob:`,
			'script-src': `'self' 'nonce-{nonce}' https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.js`,
			'style-src': `'self' 'unsafe-inline' https://unpkg.com/maplibre-gl@2.4.0/dist/maplibre-gl.css https://api.maptiler.com`,
			'connect-src': `'self' https://*.maplibre.org https://api.maptiler.com https://us1.locationiq.com`,
			'img-src': `'self' https://*.maplibre.org https://*.locationiq.com https://api.maptiler.com data:`
		},
		'/admin': {
			'script-src': `'self' 'nonce-{nonce}'`
		}
	};

	// ✅ MapLibre CDN
	const maplibreCDN = 'https://unpkg.com/maplibre-gl@2.4.0';
	const maplibreScript = `${maplibreCDN}/dist/maplibre-gl.js`;
	const maplibreStyle = `${maplibreCDN}/dist/maplibre-gl.css`;

	// ✅ Font & Style sources
	const fontDomains = ['https://*.googleapis.com', 'https://*.gstatic.com', 'https://fonts.googleapis.com'];
	const styleDomains = ["'self'", fontDomains[0], "'unsafe-inline'", maplibreStyle];

	// ✅ Image sources
	const imageDomains = [
		'https://*.website-files.com',
		'https://ui-avatars.com',
		'https://api.maptiler.com https://*.maplibre.org https://us1.locationiq.com',
		'https://*.cloudinary.com'
	];

	const connectDomains = `'self' https://api.maptiler.com https://*.maplibre.org https://*.locationiq.com https://*.onrender.com https://*.vercel.app`;

	const scriptDomains = isDevEnv
		? `'self' 'unsafe-inline' ${maplibreScript}`
		: `'report-sample' 'self' 'nonce-${nonce}' ${maplibreScript}`;

	const styleSrc = isDevEnv
		? styleDomains.join(' ')
		: `'report-sample' 'self' ${styleDomains.slice(1).join(' ')}`;

	const workerSrc = isDevEnv ? `'self' blob:` : `'self'`;

	const mediaSrc = isDevEnv
		? `'self' https://*.cloudinary.com data: blob:`
		: `'self' https://*.cloudinary.com data: blob:`;

	// ✅ Construct Content Security Policy
	const baseCsp: Record<string, string> = {
		'default-src': `'self'`,
		'script-src': scriptDomains,
		'style-src': styleSrc,
		'font-src': `'self' ${fontDomains[1]} data: blob:`,
		'img-src': `'self' ${imageDomains.join(' ')} data: blob:`,
		'connect-src': connectDomains,
		'frame-src': `'self'`,
		'object-src': `'none'`,
		'base-uri': `'self'`,
		'manifest-src': `'self'`,
		'media-src': mediaSrc,
		'worker-src': `${workerSrc} data: blob:`,
		'report-uri': `https://6852139b53f4dfa48b21aa00.endpoint.csper.io?builder=true&v=2`
	};

	const routePath = event.url.pathname;
	const overrides = routeOverrides[routePath] ?? {};

	for (const key in overrides) {
		baseCsp[key] = overrides[key]?.replace('{nonce}', nonce) ?? baseCsp[key];
	}

	const csp = Object.entries(baseCsp).map(([k, v]) => `${k} ${v}`);

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) =>
			['permissions-policy', 'content-security-policy'].includes(name.toLowerCase()),
		transformPageChunk: ({ html }) => html.replace(/%sveltekit\.nonce%/g, nonce)
	});

	// ✅ Standard Security Headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	// ✅ Only set COOP/COEP if origin is trustworthy
	const isTrustworthy = (protocol === 'https:') || hostname === 'localhost';
	if (isTrustworthy) {
		response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
		response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
	}

	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');

	// ✅ Permissions Policy
	const devPermissions = `geolocation=(self "${localOrigin}"), camera=(self "${localOrigin}"), microphone=(self "${localOrigin}")`;
	const prodPermissions = 'geolocation=(self), camera=(self), microphone=(self)';
	response.headers.set('Permissions-Policy', isDevEnv ? devPermissions : prodPermissions);

	// ✅ Final CSP header
	response.headers.set('Content-Security-Policy', csp.join('; '));

	console.log(
		`✅ Security & CSP applied for ${isDevEnv ? 'development' : 'production'} — host: ${hostname} (${isDevHostMatch ? 'dev host' : 'prod host'})`
	);

	return response;
};

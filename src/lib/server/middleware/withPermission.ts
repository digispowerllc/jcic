import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import micromatch from 'micromatch';

const PUBLIC_ROUTES = [
	'/',
	'/agent',
	'/agent/**'
];

export const withPermission: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname.toLowerCase().replace(/\/$/, '') || '/';

	const isPublic = micromatch.isMatch(pathname, PUBLIC_ROUTES);

	if (isPublic) {
		return resolve(event);
	}

	// Extend the user type to include 'role'
	const user = event.locals.user as unknown as { id: string; username: string; role?: string };

	// 👤 Block unauthenticated access on navigation requests only
	if (!user && !event.url.pathname.startsWith('/api')) {
		console.warn(`[PERMISSION] 🚫 Anonymous blocked: ${pathname}`);
		if (!event.route.id || !event.isDataRequest) {
			// Browser navigation — allow redirect
			throw redirect(307, '/login');
		}

		// fetch or programmatic request — return JSON error
		return new Response(JSON.stringify({ error: 'Not authenticated' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// 🔐 Admin guard
	if (pathname.startsWith('/admin') && user?.role !== 'admin') {
		console.warn(`[PERMISSION] ⛔ ${user?.username} denied admin access: ${pathname}`);
		throw redirect(307, '/unauthorized');
	}

	return resolve(event);
};

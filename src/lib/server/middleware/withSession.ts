import { validateSessionToken } from '$lib/server/db/auth';
import { db } from '../db/index';
import { user } from '$lib/server/db/schema';
import type { Handle } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { parse } from 'cookie';

export const withSession: Handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');
	const token = cookies.refreshToken;

	if (token) {
		const session = await validateSessionToken(token);

		if (session) {
			event.locals.session = session;
			event.locals.auth = session;

			const userRecord = await db
				.select({
					id: user.id,
					email: user.email,
					username: user.username,
					fullName: user.fullName,
					role: user.role
				})
				.from(user)
				.where(eq(user.id, session.userId))
				.get();  // use get() to fetch one record or undefined

			event.locals.user = userRecord ?? null;
		} else {
			event.locals.session = null;
			event.locals.auth = null;
			event.locals.user = null;
		}
	} else {
		event.locals.session = null;
		event.locals.auth = null;
		event.locals.user = null;
	}

	return resolve(event);
};

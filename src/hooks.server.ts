// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { withCors } from '$lib/server/middleware/withCors';
import { withLimitRate } from '$lib/server/middleware/withLimitRate';
import { withTimingLogger } from '$lib/server/middleware/withTimingLogger';
import { withSession } from '$lib/server/middleware/withSession';
import { withCsrf } from '$lib/server/middleware/withCsrf';
import { withFormGuard } from '$lib/server/middleware/withFormGuard';
import { withPermission } from '$lib/server/middleware/withPermission';
import { withSecurityAndCsp } from '$lib/server/middleware/withSecurityAndCsp';

export const handle: Handle = sequence(
	withCors, // 🌐 2. Apply CORS headers
	withLimitRate, // 🚫 3. Early rate limiting
			withTimingLogger, // ⏱️ 6. Time duration of requests
	withSession, // 🔑 7. Parse cookies/session
	withCsrf, // 🛡️ 8. Validate CSRF token
	withFormGuard, // 🧾 9. Block invalid form submissions
	withPermission, // 🔐 10. Route-level access control
	withSecurityAndCsp // 🛡️ 11. Inject security headers and 🧯 Content Security Policy (final)
);

if (import.meta.env.DEV) {
	console.log('🛠️  Middleware pipeline active (DEV)');
}



// import type { Handle } from '@sveltejs/kit';
// import * as auth from '$lib/server/auth';

// const handleAuth: Handle = async ({ event, resolve }) => {
// 	const sessionToken = event.cookies.get(auth.sessionCookieName);

// 	if (!sessionToken) {
// 		event.locals.user = null;
// 		event.locals.session = null;
// 		return resolve(event);
// 	}

// 	const { session, user } = await auth.validateSessionToken(sessionToken);

// 	if (session) {
// 		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
// 	} else {
// 		auth.deleteSessionTokenCookie(event);
// 	}

// 	event.locals.user = user;
// 	event.locals.session = session;
// 	return resolve(event);
// };

// export const handle: Handle = handleAuth;

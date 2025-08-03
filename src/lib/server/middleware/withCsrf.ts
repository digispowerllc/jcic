// File: src/lib/server/middleware/withCsrf.ts
import type { Handle } from '@sveltejs/kit';
import {
    ensureCsrfCookie,
    getSubmittedToken,
    verifyCsrf
} from '$lib/server/utils/csrf';

export const withCsrf: Handle = async ({ event, resolve }) => {
    const csrfToken = ensureCsrfCookie(event);
    event.locals.csrfToken = csrfToken;

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(event.request.method)) {
        const submitted = await getSubmittedToken(event);
        const stored = event.cookies.get('csrfToken');

        console.log('[ withCSRF ] - Stored cookie token:', stored);
        console.log('[ withCSRF ] - Submitted token:', submitted);

        if (!stored || !submitted || !verifyCsrf(stored, submitted)) {
            return new Response(JSON.stringify({ error: 'Invalid CSRF token' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }

    return resolve(event);
};

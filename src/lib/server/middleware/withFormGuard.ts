// src/lib/server/middleware/withFormGuard.ts

import type { Handle } from '@sveltejs/kit';

export const withFormGuard: Handle = async ({ event, resolve }) => {
    const method = event.request.method;

    // 🛡️ Only guard write-type requests
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        const contentType = event.request.headers.get('content-type') || '';

        // ✅ Allow only JSON, form-encoded, and multipart requests
        const allowedContentTypes = [
            'application/json',
            'application/x-www-form-urlencoded',
            'multipart/form-data'
        ];

        const isValid = allowedContentTypes.some((type) => contentType.includes(type));

        if (!isValid) {
            console.warn(`[withFormGuard] Blocked request with invalid Content-Type: ${contentType}`);
            return new Response('Unsupported Content-Type', { status: 415 });
        }

        // 🔍 Optional stricter protection: Origin & Referer validation
        const origin = event.request.headers.get('origin') || '';
        const referer = event.request.headers.get('referer') || '';
        const host = event.url.origin;

        // 🛑 Block requests from external origins (except empty origins for same-origin requests)
        if (origin && origin !== host && referer && !referer.startsWith(host)) {
            console.warn(`[withFormGuard] Blocked request from invalid origin: ${origin}, referer: ${referer}`);
            return new Response('Invalid request origin', { status: 403 });
        }
    }

    // ✅ Allow valid requests to proceed
    return resolve(event);
};

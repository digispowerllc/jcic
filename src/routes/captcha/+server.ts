// File: src/routes/captcha/+server.ts

import { isMobile, isSuspiciousIP } from '$lib/captcha/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
    const ua = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';

    let type = 'slider';
    if (isSuspiciousIP(ip)) type = 'puzzle';
    else if (isMobile(ua)) type = 'slider';
    else if (Math.random() > 0.5) type = 'puzzle';

    return new Response(JSON.stringify({ type }), {
        headers: { 'Content-Type': 'application/json' }
    });
};
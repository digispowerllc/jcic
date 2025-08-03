// src/hooks/withTimingLogger.ts

import type { Handle } from '@sveltejs/kit';

export const withTimingLogger: Handle = async ({ event, resolve }) => {
    const start = performance.now(); // Start timing

    const response = await resolve(event);

    const duration = performance.now() - start; // Measure elapsed time

    // Log the request path and duration in ms
    console.log(`[${event.url.pathname}] ⏱️ ${duration.toFixed(1)}ms`);

    // Optionally expose timing info to client (helpful for debugging)
    response.headers.set('X-Response-Time', `${duration.toFixed(1)}ms`);

    return response;
};

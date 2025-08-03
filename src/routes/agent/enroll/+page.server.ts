// +page.server.ts
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
        throw redirect(302, '/agent/dashboard');
    }

    console.log('[Agent Enroll] - Load function called with token:', event.locals.csrfToken);

    return {
        csrfToken: event.locals.csrfToken
    };
};

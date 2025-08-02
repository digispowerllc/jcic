import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { agents } from '$lib/server/db/schema';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();
        
console.log('Received data:', data);

        const {
            surname,
            firstName,
            otherName,
            email,
            phone,
            nin,
            state,
            lga,
            address
        } = data;

        await db.insert(agents).values({
            surname,
            firstName,
            otherName,
            email,
            phone,
            nin,
            state,
            lga,
            address
        });

        return json({ success: true, message: 'Agent onboarded successfully.' }, { status: 201 });
    } catch (error) {
        console.error('Onboarding error:', error);
        return json({ success: false, error: 'Onboarding failed. Please try again.' }, { status: 500 });
    }
};

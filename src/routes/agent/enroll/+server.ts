import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { agents, agentProfiles } from '$lib/server/db/schema';
import { or, eq } from 'drizzle-orm';

function sanitizeString(value: unknown): string {
	if (typeof value !== 'string') return '';
	const trimmed = value.trim();
	const noTags = trimmed.replace(/<[^>]*>/g, '');
	return noTags.replace(/[^a-zA-Z0-9\s,.\-/#]/g, '');
}

function generateUserId(): string {
	const yearSuffix = new Date().getFullYear().toString().slice(-2); // "25"
	const prefix = `JCGA${yearSuffix}`; // "JCGA25"
	const remainingLength = 15 - prefix.length; // 15 - 6 = 9

	// Generate a random alphanumeric string of length 9
	const random = Math.random().toString(36).substring(2).toUpperCase().slice(0, remainingLength);

	return `${prefix}${random}`;
}

function generateAccessCode(): string {
	const length = Math.floor(Math.random() * 5) + 8; // Random number between 8 and 12
	let code = '';

	while (code.length < length) {
		code += Math.random().toString(36).substring(2).toUpperCase();
	}

	return code.slice(0, length);
}


async function generatePatternedId(): Promise<string> {
	const year = new Date().getFullYear().toString();
	const random = Math.random().toString(36).substring(2, 8).toUpperCase();
	return `JCGAID-NIMC-${year}-${random}`;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		// console.log('[Incoming Payload]', data);

		const sanitized = {
			surname: sanitizeString(data.surname),
			firstName: sanitizeString(data.firstName),
			otherName: sanitizeString(data.otherName),
			email: sanitizeString(data.email),
			phone: sanitizeString(data.phone),
			nin: sanitizeString(data.nin),
			state: sanitizeString(data.state),
			lga: sanitizeString(data.lga),
			address: sanitizeString(data.address)
		};

		// 1) Check if already registered
		const existing = await db
			.select()
			.from(agents)
			.where(
				or(
					eq(agents.email, sanitized.email),
					eq(agents.phone, sanitized.phone),
					eq(agents.nin, sanitized.nin)
				)
			)
			.then(rows => rows[0]);

		if (existing) {
			// console.warn('[Duplicate Agent]', existing);
			return json(
				{
					success: false,
					message: 'Agent has already been registered using this email, phone, or NIN.'
				},
				{ status: 409 }
			);
		}

		const userId = generateUserId();
		const accessCode = generateAccessCode();
		const uniqueId = await generatePatternedId();

		// 2) Insert into agents
		let createdAgent;
		try {
			const result = await db
				.insert(agents)
				.values({ ...sanitized })
				.returning();

			createdAgent = result?.[0];
			// console.log('[Agent Created]', createdAgent);

			// Fallback if returning() fails
			if (!createdAgent) {
				createdAgent = await db
					.select()
					.from(agents)
					.where(eq(agents.email, sanitized.email))
					.then(rows => rows[0]);
				console.log('[Agent Fallback Fetch]', createdAgent);
			}

			if (!createdAgent) throw new Error('Agent insert failed');
		} catch (err) {
			console.error('[Agent Insert Error]', err);
			return json(
				{ success: false, error: 'Failed to create agent record.' },
				{ status: 500 }
			);
		}

		// 3) Insert into agentProfiles
		try {
			await db.insert(agentProfiles).values({
				id: createdAgent.id,     //  <-- primary key + FK to agents.id
				agentId: createdAgent.id, // <-- optional, if you still want to store it here for convenience
				userId,
				accessCode,
				passportUrl: data.passportUrl || null,
				signatureUrl: data.signatureUrl || null
			});
			// console.log('[Profile Created]', { userId, accessCode });
		} catch (err) {
			console.error('[Profile Insert Error]', err);
			return json(
				{ success: false, error: 'Failed to create agent profile.' },
				{ status: 500 }
			);
		}

		// 4) Success response
		return json(
			{
				success: true,
				message: 'Agent onboarded successfully.',
				userId,
				accessCode,
				uniqueId
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error('[Onboarding Error]', error);
		return json(
			{ success: false, error: 'Onboarding failed. Please try again.' },
			{ status: 500 }
		);
	}
};

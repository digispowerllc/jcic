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
	const year = new Date().getFullYear().toString();
	const random = Math.random().toString(36).substring(2, 6).toUpperCase();
	return `JCGA${year}${random}`;
}

function generateAccessCode(): string {
	return Math.random().toString(36).substring(2, 10).toUpperCase();
}

async function generatePatternedId(): Promise<string> {
	const year = new Date().getFullYear().toString();
	const random = Math.random().toString(36).substring(2, 8).toUpperCase();
	return `JCGAID-NIMC-${year}-${random}`;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

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

		/* 1) Check if already registered */
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

		/* 2) Insert into agents */
		const [createdAgent] = await db
			.insert(agents)
			.values({ ...sanitized })
			.returning();

		/* 3) Insert into profile */
		await db.insert(agentProfiles).values({
			agentId: createdAgent.id,
			userId,
			accessCode,
			passportUrl: data.passportUrl || null,
			signatureUrl: data.signatureUrl || null
		});

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
		console.error('Onboarding error:', error);
		return json(
			{ success: false, error: 'Onboarding failed. Please try again.' },
			{ status: 500 }
		);
	}
};

import { json, type RequestEvent } from '@sveltejs/kit';
import type { ZodSchema } from 'zod';

/**
 * Validate and parse JSON body using Zod schema.
 * Returns `{ data }` on success or `{ error }` with a JSON response.
 */
export async function validateJson<T>(
	event: RequestEvent,
	schema: ZodSchema<T>
): Promise<{ data: T } | { error: Response }> {
	let body: unknown;

	try {
		body = await event.request.json();
	} catch (err) {
		console.error('❌ JSON parse error:', err);
		return { error: json({ message: 'Malformed JSON body' }, { status: 400 }) };
	}

	const parsed = schema.safeParse(body);
	if (!parsed.success) {
		const { fieldErrors, formErrors } = parsed.error.flatten();

		console.warn('⚠️ Zod validation error:', { fieldErrors, formErrors });

		return {
			error: json(
				{
					message: 'Validation failed',
					errors: {
						fieldErrors,
						formErrors
					}
				},
				{ status: 400 }
			)
		};
	}

	return { data: parsed.data };
}

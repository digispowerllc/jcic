// src/app.d.ts
declare global {
	namespace App {
		interface Locals {
			user: string | null;
			session: string | null;
			auth: string | null;
			nonce: string | null;
			csrfToken: string | null;
			requestId: string | null;
		}
	}
}

export { };

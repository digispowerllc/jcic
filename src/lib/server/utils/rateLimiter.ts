type RateLimitOptions = {
	windowMs: number; // e.g., 60000 for 1 minute
	maxRequests: number;
};

type ClientRecord = {
	count: number;
	firstRequestTimestamp: number;
};

const clients: Map<string, ClientRecord> = new Map();

export function limitRate(clientId: string, options: RateLimitOptions): boolean {
	const now = Date.now();

	const record = clients.get(clientId);

	if (!record) {
		clients.set(clientId, { count: 1, firstRequestTimestamp: now });
		return true; // allowed
	}

	if (now - record.firstRequestTimestamp > options.windowMs) {
		// Reset window
		clients.set(clientId, { count: 1, firstRequestTimestamp: now });
		return true;
	}

	if (record.count >= options.maxRequests) {
		return false; // rate limit exceeded
	}

	record.count++;
	return true;
}

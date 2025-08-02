// Simulate puzzle data for CAPTCHA
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const dummyPuzzle = {
		image: '/captcha-assets/puzzle-template.jpg', // Replace with your actual asset path
		pieceCount: 5,
		piecePositions: [
			{ x: 10, y: 40 },
			{ x: 80, y: 60 },
			{ x: 150, y: 90 },
			{ x: 210, y: 30 },
			{ x: 270, y: 75 }
		]
	};

	return new Response(JSON.stringify(dummyPuzzle), {
		headers: { 'Content-Type': 'application/json' }
	});
};

// Simulate slider CAPTCHA challenge
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const sliderData = {
		image: '/captcha-assets/slider-bg.jpg',
		piece: '/captcha-assets/slider-piece.png',
		trackX: Math.floor(Math.random() * 150 + 30) // Random target offset for slider
	};

	return new Response(JSON.stringify(sliderData), {
		headers: { 'Content-Type': 'application/json' }
	});
};

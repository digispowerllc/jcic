// src/lib/captcha/slider.ts
export function generateSliderToken() {
	// Simple random token
	return crypto.randomUUID();
}

export function validateSliderDrag(start: number, end: number, duration: number) {
	const distance = end - start;
	const minDuration = 300; // ms
	const minDistance = 80; // px
	return distance >= minDistance && duration >= minDuration;
}
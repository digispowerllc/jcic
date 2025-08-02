// src/lib/captcha/puzzle.ts
export function generatePuzzleOffset(imageWidth: number, pieceWidth: number): number {
	const padding = 20;
	const maxOffset = imageWidth - pieceWidth - padding;
	return Math.floor(Math.random() * (maxOffset - padding) + padding);
}

export function validatePuzzlePosition(userOffset: number, expectedOffset: number): boolean {
	const tolerance = 5; // pixels
	return Math.abs(userOffset - expectedOffset) <= tolerance;
}

export function createPuzzleCanvas(bgImage: HTMLImageElement, offsetX: number, pieceWidth = 40, pieceHeight = 40): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = bgImage.width;
	canvas.height = bgImage.height;
	const ctx = canvas.getContext('2d')!;

	ctx.drawImage(bgImage, 0, 0);
	ctx.clearRect(offsetX, 40, pieceWidth, pieceHeight); // cut out puzzle

	return canvas;
}

export function createPuzzlePiece(bgImage: HTMLImageElement, offsetX: number, pieceWidth = 40, pieceHeight = 40): HTMLCanvasElement {
	const piece = document.createElement('canvas');
	piece.width = pieceWidth;
	piece.height = pieceHeight;
	const ctx = piece.getContext('2d')!;

	ctx.drawImage(bgImage, offsetX, 40, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
	return piece;
}
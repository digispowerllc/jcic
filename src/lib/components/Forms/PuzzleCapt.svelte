<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { notifySuccess, notifyError } from '$lib/store/notification';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();
	const loading = writable(true);

	let puzzleImage = '';
	let pieceImage = '';
	let targetX = 0;
	let offsetX = 0;
	let dragging = false;
	let startX = 0;
	let piece: HTMLDivElement;
	let container: HTMLDivElement;
	let solved = false;

	onMount(async () => {
		try {
			const res = await fetch('/captcha/puzzle');
			const data = await res.json();
			puzzleImage = data.bg;
			pieceImage = data.piece;
			targetX = data.x;
			loading.set(false);
		} catch (e) {
			notifyError('Failed to load CAPTCHA');
		}
	});

	function startDrag(e: MouseEvent | TouchEvent) {
		if (solved) return;
		dragging = true;
		startX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
	}

	function onDrag(e: MouseEvent | TouchEvent) {
		if (!dragging || solved) return;
		const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
		const moveX = clientX - startX;
		offsetX = Math.max(0, Math.min(moveX, container.offsetWidth - piece.offsetWidth));
	}

	function endDrag() {
		if (solved) return;
		dragging = false;
		const tolerance = 5;
		if (Math.abs(offsetX - targetX) <= tolerance) {
			solved = true;
			notifySuccess('Captcha solved');
			dispatch('solved');
		} else {
			notifyError('Try again');
			offsetX = 0;
		}
	}
</script>

{#if $loading}
	<div class="py-6 text-center">Loading...</div>
{:else}
	<div bind:this={container} class="relative mx-auto w-full max-w-md select-none">
		<img src={puzzleImage} alt="puzzle" class="w-full rounded shadow" />
		<div
			bind:this={piece}
			class="absolute top-0 h-full w-[60px] bg-contain bg-center bg-no-repeat"
			style="background-image: url('{pieceImage}'); transform: translateX({offsetX}px);"
			role="slider"
			aria-valuenow={offsetX}
			aria-valuemin="0"
			aria-valuemax={container ? container.offsetWidth - piece.offsetWidth : 100}
			tabindex="0"
			on:mousedown={startDrag}
			on:mousemove={onDrag}
			on:mouseup={endDrag}
			on:touchstart={startDrag}
			on:touchmove={onDrag}
			on:touchend={endDrag}
		></div>
	</div>
{/if}

<script lang="ts">
	let verified = false;
	let dragging = false;
	let left = 0;
	let startX = 0;

	function startDrag(event: MouseEvent) {
		dragging = true;
		startX = event.clientX;
	}

	function drag(event: MouseEvent) {
		if (!dragging) return;
		const diff = event.clientX - startX;
		left = Math.max(0, Math.min(280, diff));
	}

	function stopDrag() {
		dragging = false;
		if (left > 260) verified = true;
	}
</script>

// File: src/routes/captcha/slider/+page.svelte

<div class="w-full max-w-md rounded bg-white p-4 shadow">
	<div class="mb-2 text-sm font-medium">Drag to verify</div>
	<div class="relative h-10 rounded-full bg-gray-100">
		<div class="absolute inset-0 rounded-full border border-gray-300"></div>
		<div
			class="absolute h-10 w-10 cursor-pointer rounded-full bg-blue-500"
			style="left: {left}px"
			role="slider"
			aria-valuenow={left}
			aria-valuemin="0"
			aria-valuemax="280"
			tabindex="0"
			on:mousedown={startDrag}
			on:mousemove={drag}
			on:mouseup={stopDrag}
		></div>
	</div>
	{#if verified}
		<p class="mt-3 text-green-600">Verified ✅</p>
	{/if}
</div>

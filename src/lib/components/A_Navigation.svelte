<script lang="ts">
	import { onMount } from 'svelte';
	let navOpen = false;
	let navRef: HTMLElement;

	function handleOutsideClick(event: MouseEvent) {
		if (navOpen && navRef && !navRef.contains(event.target as Node)) {
			navOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleOutsideClick);
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});
</script>

<nav class="sticky top-0 z-30 bg-white px-6 py-4 shadow-xs select-none" bind:this={navRef}>
	<div class="flex items-center justify-between">
		<!-- Hamburger (mobile only) -->
		<button
			type="button"
			class="mr-3 p-2 focus:outline-none sm:hidden"
			on:click={() => (navOpen = !navOpen)}
			aria-label="Toggle Menu"
		>
			<svg class="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>

		<!-- Logo -->
		<a href="/" class="text-xl font-semibold text-green-800 hover:text-green-600 transition-colors">
			Jubilee Care <span class="text-green-600">.NG</span>
		</a>

		<!-- Nav Links (desktop) -->
		<div class="hidden space-x-6 sm:flex">
			<a href="#about" class="text-base font-medium text-gray-700 hover:text-green-700 transition-all">About Us</a>
			<a href="#services" class="text-base font-medium text-gray-700 hover:text-green-700 transition-all">Our Services</a>
			<a href="#projects" class="text-base font-medium text-gray-700 hover:text-green-700 transition-all">Projects</a>
			<a href="/contact" class="text-base font-medium text-gray-700 hover:text-green-700 transition-all">Contact Us</a>
		</div>
	</div>

	<!-- Mobile Nav Links -->
	{#if navOpen}
		<div class="mt-3 flex flex-col divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-sm sm:hidden">
			<a href="#about" class="block w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all">
				About Us
			</a>
			<a href="#services" class="block w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all">
				Our Services
			</a>
			<a href="#projects" class="block w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all">
				Projects
			</a>
			<a href="/contact" class="block w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-green-50 hover:text-green-700 transition-all">
				Contact Us
			</a>
		</div>
	{/if}
</nav>

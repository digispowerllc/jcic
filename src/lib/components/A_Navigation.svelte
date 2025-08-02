<script lang="ts">
	let navOpen = false;
</script>

<nav class="sticky top-0 z-50 border-b bg-white shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
		<a href="/" class="text-2xl font-bold text-green-800 hover:underline"> Jubilee Care ICT </a>
		<div class="hidden space-x-8 md:flex">
			<a href="#about" class="font-medium hover:text-green-700">About</a>
			<a href="#services" class="font-medium hover:text-green-700">Services</a>
			<a href="#projects" class="font-medium hover:text-green-700">Projects</a>
			<a href="#contact" class="font-medium hover:text-green-700">Contact</a>
		</div>
		<button
			class="md:hidden"
			on:click={() => (navOpen = !navOpen)}
			aria-label="Toggle navigation menu"
		>
			<svg class="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>
	{#if navOpen}
		<div class="space-y-2 px-4 pb-4 md:hidden">
			<a href="#about" class="block text-green-700">About</a>
			<a href="#services" class="block text-green-700">Services</a>
			<a href="#projects" class="block text-green-700">Projects</a>
			<a href="#contact" class="block text-green-700">Contact</a>
		</div>
	{/if}
</nav>

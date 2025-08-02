<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<section class="bg-white px-4 py-20 text-center sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl" in:fade={{ duration: 600 }}>
		<h1 class="text-3xl font-bold text-green-900 sm:text-4xl">
			NIMC Front-End Partner
		</h1>
		<p class="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
			Empowering Nigeria with digital identity and ICT innovation — one community at a time.
		</p>
		<div class="mt-8 flex justify-center gap-4 flex-wrap">
			<a
				href="#contact"
				class="inline-block rounded-lg bg-green-700 px-8 py-3 text-white font-semibold shadow-sm transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
			>
				Get Started
			</a>
			<a
				href="#services"
				class="inline-block rounded-lg border border-green-700 px-8 py-3 text-green-700 font-semibold transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500"
			>
				Explore Services
			</a>
		</div>
	</div>
</section>

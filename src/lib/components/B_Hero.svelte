<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<section class="bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl" in:fade={{ duration: 600 }}>
		<h2 class="text-3xl leading-tight font-bold text-green-900 sm:text-4xl">
			NIMC Partner for Digital Identity
		</h2>
		<p class="mt-4 text-base text-gray-700 sm:text-lg">
			Empowering digital identity & ICT solutions across Nigeria.
		</p>
		<div class="mt-6">
			<a
				href="#contact"
				class="inline-block rounded-lg bg-green-700 px-6 py-3 font-medium text-white transition hover:bg-green-800"
			>
				Get Started
			</a>
		</div>
	</div>
</section>

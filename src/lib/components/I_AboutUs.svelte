<script lang="ts">
	import { fade, fly } from 'svelte/transition';
</script>

<section id="about" class="bg-gray-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
	<div class="mx-auto max-w-5xl text-center">
		<h3 class="mb-6 text-3xl font-semibold text-green-800" in:fly={{ y: -20, duration: 500 }}>
			Who We Are
		</h3>
		<p
			class="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg"
			in:fade={{ duration: 600 }}
		>
			<span class="font-semibold text-green-700">Jubilee Care ICT Innovative Consult</span> is a
			forward-thinking digital identity and ICT firm, officially recognized as a
			<span class="font-medium text-green-600">NIMC Front-End Partner (FEP)</span>.
			<br class="hidden sm:block" />
			We deliver secure NIN enrollment, verification, and modification services — plus premium tech training
			and digital transformation for communities and institutions.
		</p>
	</div>
</section>

<script lang="ts">
	import CircularStat from '$lib/components/CircularStat.svelte';
</script>

<section class="bg-white px-6 py-20 select-none">
	<div class="mx-auto max-w-6xl text-center">
		<h2 class="text-3xl font-bold tracking-tight text-green-800sm:text-4xl">
			Jubilee Care & NIMC Impact
		</h2>
		<p class="mx-auto mt-3 max-w-2xl text-base text-gray-600 sm:text-lg">
			Delivering secure identity services and digital inclusion across Nigeria.
		</p>

		<div class="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto px-4 sm:px-6">
			<CircularStat label="Enrollments" value="86k +" percent={35} color="#16A34A" />
			<CircularStat label="Slip Reprints" value="120k +" percent={48} color="#2563EB" />
			<CircularStat label="Verifications" value="320k +" percent={56} color="#FF9B21" />
			<CircularStat label="Assisted Citizens" value="123k +" percent={47} color="#DC2626" />
		</div>
	</div>
</section>

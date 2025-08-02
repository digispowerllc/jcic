<script lang="ts">
	export let label: string;
	export let value: string;
	export let percent: number; // 0–100
	export let color: string = '#DC2626';

	const radius = 36;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - percent / 100);
</script>

<div class="relative mx-auto w-24 h-24 text-center">
	<svg
		viewBox="0 0 96 96"
		class="w-full h-full -rotate-90 transform"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="48"
			cy="48"
			r={radius}
			fill="transparent"
			stroke="#E5E7EB"
			stroke-width="6"
		/>
		<circle
			cx="48"
			cy="48"
			r={radius}
			fill="transparent"
			stroke={color}
			stroke-width="6"
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset={circumference}
			style={`--offset: ${offset}`}
			class="animate-progress"
		/>
	</svg>

	<div class="absolute inset-0 flex flex-col items-center justify-center">
		<span class="text-sm font-bold text-gray-900 leading-tight">{value}</span>
		<span class="text-[11px] text-gray-500 leading-snug break-words max-w-[4.5rem]">
			{label}
		</span>
	</div>
</div>

<style>
	@keyframes dash {
		to {
			stroke-dashoffset: var(--offset);
		}
	}
	.animate-progress {
		animation: dash 1.4s ease-out forwards;
	}
</style>

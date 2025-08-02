<!-- src/lib/components/CaptchaWrapper.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import SliderCaptcha from './SliderCaptcha.svelte';
	import PuzzleCaptcha from './PuzzleCaptcha.svelte';

	export let onSolved: (valid: boolean) => void;

	let type: 'slider' | 'puzzle' | null = null;

	onMount(async () => {
		const res = await fetch('/captcha');
		const data = await res.json();
		type = data.type;
	});
</script>

{#if type === 'slider'}
	<SliderCaptcha on:solved={(e) => onSolved(e.detail)} />
{:else if type === 'puzzle'}
	<PuzzleCaptcha on:solved={(e) => onSolved(e.detail)} />
{:else}
	<p>Loading CAPTCHA...</p>
{/if}

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import Notifications from '$lib/components/Global/Notification.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<Notifications />

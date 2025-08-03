<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import Footer from '$lib/components/Z_Footer.svelte';
	import Notifications from '$lib/components/Global/Notification.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<Footer />

<Notifications />

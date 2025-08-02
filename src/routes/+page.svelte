<script lang="ts">
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Hero from '$lib/components/B_Hero.svelte';
	import CoreServices from '$lib/components/C_CoreServices.svelte';
	import AboutUs from '$lib/components/D_AboutUs.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import AgentEnrollmentModal from '$lib/components/Agents/AgentEnrollmentModal.svelte';
	let showModal = true; // or trigger based on condition

	onMount(() => {
		showModal = true;
	});
</script>

<!-- Navigation -->
<Navigation />

<!-- Agent Enrollment Modal -->
<AgentEnrollmentModal show={showModal} onClose={() => (showModal = false)} />

<!-- Hero Section -->
<Hero />

<!-- Core Services Grid -->
<CoreServices />

<!-- About Section -->
<AboutUs />

<!-- 🦶 Footer -->
<Footer />

<style>
</style>

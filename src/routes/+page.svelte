<script lang="ts">
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Hero from '$lib/components/B_Hero.svelte';
	import CoreServices from '$lib/components/C_CoreServices.svelte';
	import Testimonials from '$lib/components/D_Testimonials.svelte';
	import ImpactSection from '$lib/components/G_ImpactSection.svelte';
	import VisualInsight from '$lib/components/H_VisualInsight.svelte';
	import AboutUs from '$lib/components/I_AboutUs.svelte';
	import SocialHandles from '$lib/components/F_SocialHandles.svelte';
	import Footer from '$lib/components/Z_Footer.svelte';

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

<!-- Impact Section -->
<ImpactSection />

<!-- Testimonials Section -->
<Testimonials />

<!-- Visual Insight Section -->
<VisualInsight />

<!-- About Section -->
<AboutUs />

<!-- Social Handles Section -->
<SocialHandles />

<!-- 🦶 Footer -->
<Footer />

<style>
</style>

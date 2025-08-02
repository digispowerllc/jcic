<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	const services = [
		{
			icon: '🆔',
			title: 'NIN Enrollment',
			desc: 'Register your National ID with ease.'
		},
		{
			icon: '✍️',
			title: 'NIN Modification',
			desc: 'Update and validate your NIN data securely.'
		},
		{
			icon: '💻',
			title: 'ICT Training',
			desc: 'Get certified in essential tech skills.'
		},
		{
			icon: '🔒',
			title: 'Biometric Solutions',
			desc: 'Secure identity capture and verification.'
		},
		{
			icon: '🖨️',
			title: 'NIN Slip Printing',
			desc: 'Reprint your NIN slip quickly and safely.'
		},
		{
			icon: '🧠',
			title: 'ICT Consultancy',
			desc: 'Build and manage ICT systems for institutions.'
		}
	];

	let navOpen = false;
</script>

<!-- Navigation -->
<nav class="sticky top-0 z-50 border-b bg-white shadow-sm">
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
		<h1 class="text-xl font-bold text-green-800 sm:text-2xl">Jubilee Care ICT</h1>
		<div class="hidden space-x-6 md:flex lg:space-x-8">
			<a href="#about" class="font-medium hover:text-green-600">About</a>
			<a href="#services" class="font-medium hover:text-green-600">Services</a>
			<a href="#projects" class="font-medium hover:text-green-600">Projects</a>
			<a href="#contact" class="font-medium hover:text-green-600">Contact</a>
		</div>
		<button class="md:hidden" on:click={() => (navOpen = !navOpen)}>
			<svg class="h-6 w-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>
	{#if navOpen}
		<div class="space-y-2 border-t bg-white px-4 pb-4 md:hidden">
			<a href="#about" class="block text-green-700">About</a>
			<a href="#services" class="block text-green-700">Services</a>
			<a href="#projects" class="block text-green-700">Projects</a>
			<a href="#contact" class="block text-green-700">Contact</a>
		</div>
	{/if}
</nav>

<!-- 🌟 Hero Section -->
<section class="bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
	<div class="mx-auto max-w-3xl" in:fade={{ duration: 600 }}>
		<h2 class="text-3xl leading-tight font-bold text-green-900 sm:text-4xl">
			Trusted NIMC Partner for Digital Identity in Nigeria
		</h2>
		<p class="mt-4 text-base text-gray-700 sm:text-lg">
			We deliver secure NIN enrollment, biometric services, and ICT training nationwide.
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

<!-- 🧩 Core Services Grid -->
<section id="services" class="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl text-center">
		<h3 class="mb-10 text-3xl font-semibold text-green-800" in:fly={{ y: -20, duration: 500 }}>
			Our Core Services
		</h3>
		<div class="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
			{#each services as service (service.title)}
				<div
					class="rounded-xl bg-white p-6 text-left shadow-md transition hover:shadow-lg"
					in:fade={{ duration: 400 }}
				>
					<div class="mb-4 text-4xl text-green-700">{service.icon}</div>
					<h4 class="mb-2 text-xl font-bold text-green-800">{service.title}</h4>
					<p class="text-sm text-gray-600">{service.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- 🧾 About Section -->
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

<style>
	html {
		background-color: white;
	}
</style>

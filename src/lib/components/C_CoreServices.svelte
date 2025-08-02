<script lang="ts">
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Hero from '$lib/components/B_Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { fade, fly } from 'svelte/transition';

	const services = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>`,
			title: 'NIN Enrollment',
			desc: 'Register your National ID with ease.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h6M11 9h6M5 13h6m-6 4h6" />
               </svg>`,
			title: 'NIN Modification',
			desc: 'Update and validate your NIN data securely.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422A12.083 12.083 0 0112 20.944a12.083 12.083 0 01-6.16-10.366L12 14z" />
               </svg>`,
			title: 'ICT Training',
			desc: 'Get certified in essential tech skills.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
               </svg>`,
			title: 'Biometric Solutions',
			desc: 'Secure identity capture and verification.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0v2a2 2 0 002 2h2a2 2 0 002-2v-2" />
               </svg>`,
			title: 'NIN Slip Printing',
			desc: 'Reprint your NIN slip quickly and safely.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L8 21h8l-1.75-4M12 3v4m0 0a4 4 0 014 4v1a4 4 0 01-4 4m0-9a4 4 0 00-4 4v1a4 4 0 004 4" />
               </svg>`,
			title: 'ICT Consultancy',
			desc: 'Build and manage ICT systems for institutions.'
		}
	];
</script>

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
					<div class="mb-4 flex items-center justify-center text-green-700">
						{@html service.icon}
					</div>
					<h4 class="mb-2 text-center text-xl font-bold text-green-800">{service.title}</h4>
					<p class="text-center text-sm text-gray-600">{service.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

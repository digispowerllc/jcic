<script lang="ts">
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Hero from '$lib/components/B_Hero.svelte';
	import Footer from '$lib/components/Z_Footer.svelte';
	import { fade, fly } from 'svelte/transition';

	const services = [
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
             </svg>`,
			title: 'NIN Enrollment',
			desc: 'Register your National ID quickly and conveniently with accredited support.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h6M11 9h6M5 13h6m-6 4h6" />
             </svg>`,
			title: 'NIN Modification',
			desc: 'Securely update and correct your NIN records.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422A12.083 12.083 0 0112 20.944a12.083 12.083 0 01-6.16-10.366L12 14z" />
             </svg>`,
			title: 'ICT Training',
			desc: 'Get trained and certified in core digital and tech skills.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
             </svg>`,
			title: 'Biometric Solutions',
			desc: 'Advanced biometric systems for accurate identity verification.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0v2a2 2 0 002 2h2a2 2 0 002-2v-2" />
             </svg>`,
			title: 'NIN Slip Printing',
			desc: 'Print or reprint your NIN slip on demand with our secure service.'
		},
		{
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L8 21h8l-1.75-4M12 3v4m0 0a4 4 0 014 4v1a4 4 0 01-4 4m0-9a4 4 0 00-4 4v1a4 4 0 004 4" />
             </svg>`,
			title: 'ICT Consultancy',
			desc: 'Plan, deploy, and manage scalable ICT infrastructure and systems.'
		}
	];
</script>

<section id="services" class="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl text-center">
		<h3 class="text-3xl font-bold text-green-900 sm:text-4xl mb-12" in:fly={{ y: -20, duration: 400 }}>
			Our Core Services
		</h3>

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each services as service (service.title)}
				<div
					class="rounded-xl bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
					in:fade={{ duration: 400 }}
				>
					<div class="mb-4 flex justify-center text-green-700">
						{@html service.icon}
					</div>
					<h4 class="mb-2 text-lg font-semibold text-green-800 text-center">
						{service.title}
					</h4>
					<p class="text-sm text-gray-600 text-center">{service.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

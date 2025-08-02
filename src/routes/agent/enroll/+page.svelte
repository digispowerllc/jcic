<script lang="ts">
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { notifySuccess, notifyError } from '$lib/store/notification';

	let step = 1;
	let formSubmitted = false;

	// Form fields
	let surname = '';
	let firstName = '';
	let otherName = '';
	let email = '';
	let phone = '';
	let nin = '';
	let state = '';
	let lga = '';
	let address = '';

	// Validation errors
	let errors: Record<string, string> = {};

	// State/LGA logic
	let states: string[] = [];
	let cities: string[] = [];
	let stateLoading = false;
	let cityLoading = false;
	let previousState = '';
	const lgaCache = new Map<string, string[]>();

	function handleBlur(event: FocusEvent) {
		const input = event.target as HTMLInputElement | HTMLTextAreaElement;
		let val = input.value;
		if (val.trim() === '') return;
		const trimmed = val.trim();
		if (/\s/.test(trimmed.slice(1, -1))) {
			input.value = val; // invalid due to inner space, restore original
		} else {
			input.value = trimmed;
		}
	}

	function validateStep(): boolean {
		errors = {};

		const onlyLetters = /^[A-Za-z]+$/;
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phonePattern = /^\d{10,15}$/;
		const ninPattern = /^\d{11}$/;

		function hasInternalWhitespace(str: string): boolean {
			const trimmed = str.trim();
			return /\s/.test(trimmed.slice(1, -1));
		}

		if (step === 1) {
			surname = surname.trim();
			firstName = firstName.trim();

			if (!surname) {
				notifyError('Surname is required.');
				return false;
			} else if (!onlyLetters.test(surname)) {
				notifyError('Surname must contain only letters.');
				return false;
			} else if (hasInternalWhitespace(surname)) {
				notifyError('Surname must not contain spaces between characters.');
				return false;
			}

			if (!firstName) {
				notifyError('First name is required.');
				return false;
			} else if (!onlyLetters.test(firstName)) {
				notifyError('First name must contain only letters.');
				return false;
			} else if (hasInternalWhitespace(firstName)) {
				notifyError('First name must not contain spaces between characters.');
				return false;
			}
		}

		if (step === 2) {
			email = email.trim();
			phone = phone.trim();

			if (!email) {
				notifyError('Email is required.');
				return false;
			} else if (!emailPattern.test(email)) {
				notifyError('Invalid email format.');
				return false;
			} else if (hasInternalWhitespace(email)) {
				notifyError('Email must not contain spaces between characters.');
				return false;
			}

			if (!phone) {
				notifyError('Phone number is required.');
				return false;
			} else if (!phonePattern.test(phone)) {
				notifyError('Phone must be 10–15 digits.');
				return false;
			} else if (hasInternalWhitespace(phone)) {
				notifyError('Phone number must not contain spaces between characters.');
				return false;
			}
		}

		if (step === 3) {
			nin = nin.trim();

			if (!nin) {
				notifyError('NIN is required.');
				return false;
			} else if (!ninPattern.test(nin)) {
				notifyError('NIN must be exactly 11 digits.');
				return false;
			} else if (hasInternalWhitespace(nin)) {
				notifyError('NIN must not contain spaces between characters.');
				return false;
			}
		}

		if (step === 4) {
			address = address.trim();

			if (!state) {
				notifyError('State is required.');
				return false;
			}
			if (!lga) {
				notifyError('LGA is required.');
				return false;
			}
			if (!address) {
				notifyError('Address is required.');
				return false;
			}

			if (/[^a-zA-Z0-9\s,.-]/.test(address)) {
				notifyError('Address must not contain special characters.');
				return false;
			}
			if (address.length < 10) {
				notifyError('Address must be at least 10 characters long.');
				return false;
			}
		}
		return true;
	}

	function nextStep() {
		if (validateStep()) step++;
	}

	function prevStep() {
		if (step > 1) step--;
	}

	function submitForm() {
		if (!validateStep()) return;
		formSubmitted = true;
		notifySuccess('✅ Form submitted successfully!');
	}

	async function loadStates() {
		stateLoading = true;
		try {
			const cached = sessionStorage.getItem('cachedStates');
			if (cached) {
				states = JSON.parse(cached);
			} else {
				const res = await fetch('https://apinigeria.vercel.app/api/v1/states');
				const data = await res.json();
				states = data.states;
				sessionStorage.setItem('cachedStates', JSON.stringify(states));
			}
		} catch {
			states = [];
		} finally {
			stateLoading = false;
		}
	}

	async function fetchCities(state: string) {
		cityLoading = true;
		try {
			if (lgaCache.has(state)) {
				cities = lgaCache.get(state) ?? [];
				return;
			}
			const res = await fetch(
				`https://apinigeria.vercel.app/api/v1/lga?state=${encodeURIComponent(state)}`
			);
			const data = await res.json();
			cities = data.lgas;
			lgaCache.set(state, cities);
		} catch {
			cities = [];
		} finally {
			cityLoading = false;
		}
	}

	onMount(loadStates);
	$: if (state && state !== previousState) {
		previousState = state;
		cities = [];
		fetchCities(state);
	}
</script>

<Navigation />

<div class="mx-auto max-w-3xl px-4 py-10">
	<div class="mt-10 mb-10 text-center">
		<h1 class="text-3xl font-bold text-[#008751]">Agent Onboarding</h1>
		<p class="mt-2 text-sm text-gray-600 sm:text-base">
			Complete the steps below to begin your onboarding process.
		</p>
	</div>

	{#if formSubmitted}
		<div
			class="rounded-lg border border-green-200 bg-green-50 p-6 text-center text-green-800 shadow"
		>
			<h2 class="text-lg font-semibold">✅ Success</h2>
			<p>Your onboarding request has been received. We’ll be in touch shortly.</p>
		</div>
	{:else}
		<form class="space-y-6 rounded-xl bg-white p-6 shadow-md" on:submit|preventDefault={submitForm}>
			<!-- Step 1: Personal Info -->
			{#if step === 1}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 1: Personal Information</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<input
								type="text"
								bind:value={surname}
								placeholder="Surname"
								class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
							/>
						</div>
						<div>
							<input
								type="text"
								bind:value={firstName}
								placeholder="First Name"
								class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
							/>
						</div>
						<input
							type="text"
							bind:value={otherName}
							placeholder="Other Name (Optional)"
							class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
						/>
					</div>
				</div>
			{/if}

			<!-- Step 2: Contact Info -->
			{#if step === 2}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 2: Contact Information</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<input
								type="email"
								bind:value={email}
								placeholder="e-Mail Address"
								class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
							/>
						</div>
						<div>
							<input
								type="tel"
								bind:value={phone}
								maxlength="11"
								minlength="11"
								placeholder="e.g. 08012345678"
								pattern="[0-9]{11}"
								class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
							/>
						</div>
					</div>
				</div>
			{/if}

			<!-- Step 3: Identification -->
			{#if step === 3}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 3: Identification</h2>
					<div>
						<input
							type="tel"
							bind:value={nin}
							maxlength="11"
							minlength="11"
							placeholder="National Identification Number (NIN)"
							pattern="[0-9]{11}"
							class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
						/>
					</div>
				</div>
			{/if}

			<!-- Step 4: Location & Verification -->
			{#if step === 4}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 4: Location & Verification</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<select
								bind:value={state}
								class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
								disabled={stateLoading}
							>
								<option value="">Select State *</option>
								{#each states as s}
									<option value={s}>{s}</option>
								{/each}
							</select>
						</div>
						<div>
							<select
								bind:value={lga}
								class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
								disabled={cityLoading || !cities.length}
							>
								<option value="">Select LGA *</option>
								{#each cities as c}
									<option value={c}>{c}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="mt-4">
						<textarea
							bind:value={address}
							placeholder="Full Address *"
							class="input min-h-[100px] w-full"
						></textarea>
					</div>

					<div class="mt-4">
						<p class="text-sm text-gray-600">
							By submitting this form, you agree to our{' '}
							<a href="/terms" class="text-[#008751] hover:underline">Terms of Service</a> and{' '}
							<a href="/privacy" class="text-[#008751] hover:underline">Privacy Policy</a>.
						</p>
					</div>
				</div>
			{/if}

			<!-- Navigation Buttons -->
			<div class="flex justify-between pt-6">
				{#if step > 1}
					<button type="button" on:click={prevStep} class="text-[#008751] hover:underline">
						← Back
					</button>
				{/if}
				{#if step < 4}
					<button
						type="button"
						on:click={nextStep}
						class="rounded bg-[#008751] px-6 py-2 text-white hover:bg-[#006f42]"
					>
						Next →
					</button>
				{:else}
					<button
						type="submit"
						class="rounded bg-[#008751] px-6 py-2 text-white hover:bg-[#006f42]"
					>
						Submit
					</button>
				{/if}
			</div>
		</form>
	{/if}
</div>

<Footer />

<style>
</style>

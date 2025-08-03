<script lang="ts">
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Footer from '$lib/components/Z_Footer.svelte';
	import { onMount } from 'svelte';
	import { notifySuccess, notifyError } from '$lib/store/notification';

	let step = 1;
	let formSubmitted = false;

	let agentData = {
		surname: '',
		firstName: '',
		otherName: '',
		email: '',
		phone: '',
		nin: '',
		state: '',
		lga: '',
		address: ''
	};

	const initialData = { ...agentData };

	// Validation errors
	let errors: Record<string, string> = {};

	// State/LGA logic
	let states: string[] = [];
	let cities: string[] = [];
	let stateLoading = false;
	let cityLoading = false;
	let previousState = '';
	const lgaCache = new Map<string, string[]>();

	const onlyLetters = /^[A-Za-z]+$/;
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const phonePattern = /^\d{10,15}$/;
	const ninPattern = /^\d{11}$/;

	function validateEmail(email: string): boolean {
		const trimmed = email.trim();
		if (!trimmed) {
			notifyError('Email is required.');
			return false;
		}
		if (/\s/.test(trimmed)) {
			notifyError('Email must not contain any space characters.');
			return false;
		}
		if (!emailRegex.test(trimmed)) {
			notifyError('Invalid email format.');
			return false;
		}
		return true;
	}

	async function checkEmail(): Promise<boolean> {
		try {
			const res = await fetch(
				`https://apinigeria.vercel.app/api/checkemail?email=${encodeURIComponent(agentData.email)}`
			);
			const result = await res.json();
			if (result.disposable) {
				notifyError('Disposable email detected. Please use a valid email.');
				return false;
			}
		} catch {
			notifyError('Failed to verify email.');
			return false;
		}
		return true;
	}

	function validateStep(): boolean {
		errors = {};

		function hasInternalWhitespace(str: string): boolean {
			const trimmed = str.trim();
			return /\s/.test(trimmed.slice(1, -1));
		}

		if (step === 1) {
			agentData.surname = agentData.surname.trim();
			agentData.firstName = agentData.firstName.trim();
			agentData.otherName = agentData.otherName.trim();

			if (!agentData.surname) {
				notifyError('Surname is required.');
				return false;
			} else if (!onlyLetters.test(agentData.surname)) {
				notifyError('Surname must contain only letters.');
				return false;
			} else if (hasInternalWhitespace(agentData.surname)) {
				notifyError('Surname must not contain spaces between characters.');
				return false;
			}

			if (!agentData.firstName) {
				notifyError('First name is required.');
				return false;
			} else if (!onlyLetters.test(agentData.firstName)) {
				notifyError('First name must contain only letters.');
				return false;
			} else if (hasInternalWhitespace(agentData.firstName)) {
				notifyError('First name must not contain spaces between characters.');
				return false;
			}

			if (agentData.otherName) {
				const trimmed = agentData.otherName.trim();
				if (!onlyLetters.test(trimmed)) {
					notifyError('Other name must contain only letters.');
					return false;
				}
				if (hasInternalWhitespace(trimmed)) {
					notifyError('Other name must not contain spaces between characters.');
					return false;
				}
				agentData.otherName = trimmed;
			}
		}

		if (step === 2) {
			agentData.email = agentData.email.trim();
			agentData.phone = agentData.phone.trim();

			if (!validateEmail(agentData.email)) return false;

			if (!agentData.phone) {
				notifyError('Phone number is required.');
				return false;
			} else if (!phonePattern.test(agentData.phone)) {
				notifyError('Phone must be 10–15 digits.');
				return false;
			} else if (/\s/.test(agentData.phone)) {
				notifyError('Phone number must not contain spaces.');
				return false;
			}
		}

		if (step === 3) {
			agentData.nin = agentData.nin.trim();

			if (!agentData.nin) {
				notifyError('NIN is required.');
				return false;
			} else if (!ninPattern.test(agentData.nin)) {
				notifyError('NIN must be exactly 11 digits.');
				return false;
			} else if (/\s/.test(agentData.nin)) {
				notifyError('NIN must not contain spaces.');
				return false;
			}
		}

		if (step === 4) {
			agentData.address = agentData.address.trim();

			if (!agentData.state) {
				notifyError('State is required.');
				return false;
			}
			if (!agentData.lga) {
				notifyError('LGA is required.');
				return false;
			}
			if (!agentData.address) {
				notifyError('Address is required.');
				return false;
			}
			if (/[^a-zA-Z0-9\s,.\-\/#]/.test(agentData.address)) {
				notifyError('Address must not contain special characters.');
				return false;
			}
			if (agentData.address.length < 10) {
				notifyError('Address must be at least 10 characters long.');
				return false;
			}
			if (agentData.address.length > 200) {
				notifyError('Address must not exceed 200 characters.');
				return false;
			}
		}

		return true;
	}

	async function nextStep() {
		if (await validateBeforeNext()) {
			step++;
		}
	}

	async function validateBeforeNext(): Promise<boolean> {
		if (!validateStep()) return false;
		// run disposable email check only on step 2
		if (step === 2) {
			const ok = await checkEmail();
			if (!ok) return false;
		}
		return true;
	}

	function prevStep() {
		if (step > 1) step--;
	}

	async function submitForm() {
		if (!(await validateBeforeNext())) return;

		formSubmitted = true;

		try {
			const response = await fetch('/agent/enroll', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(agentData)
			});

			const result = await response.json();

			if (!response.ok) {
				notifyError(result?.error || 'Unknown error occurred.');
				return;
			}

			notifySuccess('Agent onboarded successfully!');
			agentData = { ...initialData };
			window.location.reload();
		} catch (error) {
			console.error('Submission failed:', error);
			const message = error instanceof Error ? error.message : String(error);
			notifyError(`❌ ${message}`);
		} finally {
			formSubmitted = false;
		}
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
	$: if (agentData.state && agentData.state !== previousState) {
		previousState = agentData.state;
		cities = [];
		fetchCities(agentData.state);
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

	<form class="space-y-6 rounded-xl bg-white p-6 shadow-md" on:submit|preventDefault={submitForm}>
		<!-- Step 1: Personal Info -->
		{#if step === 1}
			<div>
				<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 1: Personal Information</h2>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div>
						<input
							type="text"
							bind:value={agentData.surname}
							placeholder="Surname"
							class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
						/>
					</div>
					<div>
						<input
							type="text"
							bind:value={agentData.firstName}
							placeholder="First Name"
							class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
						/>
					</div>
					<input
						type="text"
						bind:value={agentData.otherName}
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
							bind:value={agentData.email}
							placeholder="e-Mail Address"
							class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
						/>
					</div>
					<div>
						<input
							type="tel"
							bind:value={agentData.phone}
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
						bind:value={agentData.nin}
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
							bind:value={agentData.state}
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
							bind:value={agentData.lga}
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
						bind:value={agentData.address}
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
					disabled={formSubmitted}
					class="flex items-center gap-2 rounded bg-[#008751] px-6 py-2 text-white hover:bg-[#006f42]"
				>
					{#if formSubmitted}
						<span
							class="loader h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></span>
						Submitting...
					{:else}
						Submit
					{/if}
				</button>
			{/if}
		</div>
	</form>
</div>

<Footer />

<style>
</style>

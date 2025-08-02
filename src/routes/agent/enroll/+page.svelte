<script lang="ts">
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

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

	// Captcha
	let num1 = Math.floor(Math.random() * 10) + 1;
	let num2 = Math.floor(Math.random() * 10) + 1;
	let captchaAnswer = '';
	let captchaCorrect = false;

	// State/LGA logic
	let states: string[] = [];
	let cities: string[] = [];
	let stateLoading = false;
	let cityLoading = false;
	let previousState = '';
	const lgaCache = new Map<string, string[]>();

	function verifyCaptcha() {
		const expected = num1 + num2;
		const userAnswer = parseInt(captchaAnswer.trim());

		// Check if userAnswer is a valid number and matches expected
		captchaCorrect = !isNaN(userAnswer) && userAnswer === expected;
	}

	function nextStep() {
		if (step === 1 && (!surname || !firstName)) return;
		if (step === 2 && (!email || !phone)) return;
		if (step === 3 && !nin) return;
		if (step === 4 && (!state || !lga || !address)) return;
		step++;
	}

	function prevStep() {
		if (step > 1) step--;
	}

	function submitForm() {
		verifyCaptcha();
		if (!captchaCorrect) return;
		formSubmitted = true;
	}

	// Load states
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
	<div class="mb-8 text-center">
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
						<input
							type="text"
							bind:value={surname}
							placeholder="Surname *"
							required
							class="input"
						/>
						<input
							type="text"
							bind:value={firstName}
							placeholder="First Name *"
							required
							class="input"
						/>
						<input type="text" bind:value={otherName} placeholder="Other Name" class="input" />
					</div>
				</div>
			{/if}

			<!-- Step 2: Contact Info -->
			{#if step === 2}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 2: Contact Information</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<input
							type="email"
							bind:value={email}
							placeholder="Email Address *"
							required
							class="input"
						/>
						<input
							type="tel"
							bind:value={phone}
							placeholder="Phone Number *"
							required
							class="input"
						/>
					</div>
				</div>
			{/if}

			<!-- Step 3: Identification -->
			{#if step === 3}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 3: Identification</h2>
					<input
						type="text"
						bind:value={nin}
						placeholder="National Identification Number (NIN) *"
						required
						maxlength="11"
						class="input"
					/>
				</div>
			{/if}

			<!-- Step 4: Location & Verification -->
			{#if step === 4}
				<div>
					<h2 class="mb-4 text-xl font-semibold text-[#008751]">Step 4: Location & Verification</h2>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<select bind:value={state} class="input" disabled={stateLoading}>
							<option value="" disabled selected>Select State *</option>
							{#each states as s}
								<option value={s}>{s}</option>
							{/each}
						</select>
						<select bind:value={lga} class="input" disabled={cityLoading || !cities.length}>
							<option value="" disabled selected>Select LGA *</option>
							{#each cities as c}
								<option value={c}>{c}</option>
							{/each}
						</select>
					</div>
					<textarea
						bind:value={address}
						placeholder="Full Address *"
						required
						class="input mt-4 min-h-[100px] w-full"
					></textarea>

					<!-- Captcha -->
					<div class="mt-4 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
						<label for="captcha-input" class="mb-1 text-sm font-medium text-gray-700 sm:mb-0">
							Verify you're not a bot:
						</label>
						<span class="text-lg font-semibold text-[#008751]">{num1} + {num2} =</span>
						<input
							id="captcha-input"
							type="text"
							bind:value={captchaAnswer}
							placeholder="?"
							class="input w-24"
							required
						/>
					</div>

					{#if captchaAnswer && !captchaCorrect}
						<p class="mt-1 text-sm text-red-600">Incorrect captcha answer. Please try again.</p>
					{/if}
				</div>
			{/if}

			<!-- Navigation Buttons -->
			<div class="flex justify-between pt-6">
				{#if step > 1}
					<button type="button" on:click={prevStep} class="text-[#008751] hover:underline"
						>← Back</button
					>
				{/if}
				{#if step < 4}
					<button
						type="button"
						on:click={nextStep}
						class="rounded bg-[#008751] px-6 py-2 text-white hover:bg-[#006f42]">Next →</button
					>
				{:else}
					<button type="submit" class="rounded bg-[#008751] px-6 py-2 text-white hover:bg-[#006f42]"
						>Submit</button
					>
				{/if}
			</div>
		</form>
	{/if}
</div>

<Footer />

<style>
	input,
	select,
	textarea {
		border: 1px solid #d1d5db;
		border-radius: 0.375rem;
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
	}

	.input {
		box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
		transition: border-color 0.2s ease-in-out;
	}

	.input:focus {
		border-color: #008751;
		outline: none;
	}

	button {
		font-size: 1rem;
		font-weight: 600;
	}
</style>

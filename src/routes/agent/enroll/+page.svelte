<script lang="ts">
	let surname = '';
	let firstName = '';
	let otherName = '';
	let email = '';
	let nin = '';
	let state = '';
	let lga = '';
	let address = '';

	// Captcha
	let num1 = Math.floor(Math.random() * 10) + 1;
	let num2 = Math.floor(Math.random() * 10) + 1;
	let captchaAnswer = '';
	let captchaCorrect = false;
	let formSubmitted = false;

	function verifyCaptcha() {
		captchaCorrect = parseInt(captchaAnswer) === num1 + num2;
	}

	function submitForm() {
		verifyCaptcha();
		if (!captchaCorrect) return;

		// Submit logic here (e.g. POST to backend)
		formSubmitted = true;
	}
</script>

{#if formSubmitted}
	<div class="rounded-lg border border-green-200 bg-green-50 p-6 text-green-800 shadow">
		<h2 class="text-lg font-semibold">Success</h2>
		<p>Your onboarding request has been received.</p>
	</div>
{:else}
	<form class="space-y-4 rounded-xl bg-white p-6 shadow" on:submit|preventDefault={submitForm}>
		<h2 class="mb-4 text-2xl font-bold text-[#008751]">Agent Onboarding Form</h2>

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<input type="text" bind:value={surname} placeholder="Surname" required class="input" />
			<input type="text" bind:value={firstName} placeholder="First Name" required class="input" />
			<input type="text" bind:value={otherName} placeholder="Other Name" class="input" />
			<input type="email" bind:value={email} placeholder="Email Address" required class="input" />
			<input type="text" bind:value={nin} placeholder="NIN" required maxlength="11" class="input" />
			<input type="text" bind:value={state} placeholder="State" required class="input" />
			<input
				type="text"
				bind:value={lga}
				placeholder="Local Government Area"
				required
				class="input"
			/>
		</div>

		<textarea
			bind:value={address}
			placeholder="Full Address"
			required
			class="input min-h-[100px] w-full"
		></textarea>

		<!-- Captcha -->
		<div class="mt-4 flex items-center space-x-3">
			<label for="captcha-input" class="font-medium text-gray-700">Captcha:</label>
			<span class="text-lg font-semibold text-[#008751]">{num1} + {num2} =</span>
			<input
				id="captcha-input"
				type="text"
				bind:value={captchaAnswer}
				placeholder="?"
				class="input w-20"
				required
			/>
		</div>

		{#if captchaAnswer && !captchaCorrect}
			<p class="mt-1 text-sm text-red-600">Incorrect captcha answer.</p>
		{/if}

		<div class="mt-4">
			<button type="submit" class="rounded bg-[#008751] px-6 py-2 text-white hover:bg-[#006f42]">
				Submit
			</button>
		</div>
	</form>
{/if}

<style>
	.input {
		@apply w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#008751] focus:outline-none;
	}
</style>

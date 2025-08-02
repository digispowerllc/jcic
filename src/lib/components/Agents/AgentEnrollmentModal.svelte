<script>
	export let show = false;
	export let onClose = () => {};
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
			<!-- Close Button -->
			<button
				class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
				on:click={onClose}
				aria-label="Close modal"
			>
				&times;
			</button>

			<h2 class="text-xl font-semibold text-[#008751]">Agent Enrollment Ongoing</h2>
			<p class="mt-2 text-gray-700">
				We're currently running an agent onboarding session. You can register at any of our approved
				centers or contact support for more information.
			</p>

			<div class="mt-4 flex justify-end">
				<button
					class="rounded-md bg-[#008751] px-4 py-2 text-white transition hover:bg-[#006f42]"
					on:click={onClose}
				>
					Start Onboarding
				</button>
			</div>
		</div>
	</div>
{/if}

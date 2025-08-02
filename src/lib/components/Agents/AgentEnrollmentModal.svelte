<script>
	export let show = false;
	export let onClose = () => {};
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
			<!-- Close Button -->
			<button
				class="absolute top-3 right-3 text-xl text-gray-500 hover:text-red-500"
				on:click={onClose}
				aria-label="Close modal">
				&times;
			</button>

			<h2 class="text-xl font-bold text-[#008751]">Agent Enrollment In Progress</h2>
			<p class="mt-2 text-gray-600">
				Our agent onboarding window is currently open. You may begin your registration online or visit any
				accredited enrollment centre for assisted signup.
			</p>

			<div class="mt-6 flex justify-end gap-3">
				<a
					href="/contact"
					class="rounded-md border border-[#008751] px-4 py-2 text-[#008751] transition hover:bg-[#008751]/10"
					data-sveltekit-preload-data>
					Contact Support
				</a>

				<a
					href="/agent/enroll"
					class="rounded-md bg-[#008751] px-4 py-2 text-white transition hover:bg-[#006f42]"
					data-sveltekit-preload-data
					on:click={onClose}>
					Start Enrollment
				</a>
			</div>
		</div>
	</div>
{/if}

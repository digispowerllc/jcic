<script lang="ts">
	import Navigation from '$lib/components/A_Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let name = '';
	let email = '';
	let message = '';

	function handleSubmit(e: Event) {
		e.preventDefault();
		// TODO: Replace with actual backend submission
		alert('Message sent!');
	}
</script>

<Navigation />

<section class="min-h-screen bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
	<div class="mx-auto mb-12 max-w-4xl text-center">
		<h1 class="text-3xl font-bold text-[#008751]">Contact Us</h1>
		<p class="mx-auto mt-2 max-w-2xl text-gray-600">
			We’d love to hear from you. Whether you have a question about services, pricing, or anything
			else, our team is ready to answer all your questions.
		</p>
	</div>

	<div
		class="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-10 shadow-lg sm:px-10 md:px-16 lg:px-20"
	>
		<div class="grid gap-10 md:grid-cols-2">
			<!-- Contact Information -->
			<div class="space-y-6">
				<div>
					<h4 class="text-lg font-semibold text-gray-800">Email</h4>
					<p class="text-gray-600">
						<a href="mailto:info@jubileecare.ng" class="hover:text-green-700">info@jubileecare.ng</a
						>
					</p>
				</div>

				<div>
					<h4 class="text-lg font-semibold text-gray-800">Phone</h4>
					<p class="text-gray-600">
						<a href="tel:+2348000000000" class="hover:text-green-700">+234 800 000 0000</a>
					</p>
				</div>

				<div>
					<h4 class="text-lg font-semibold text-gray-800">Address</h4>
					<p class="text-gray-600">
						<a
							href="https://www.google.com/maps/place/Umuahia+Nigeria"
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-green-700"
						>
							Nigeria
						</a>
					</p>
				</div>
			</div>

			<!-- Contact Form -->
			<form on:submit|preventDefault={handleSubmit} class="grid grid-cols-1 gap-6">
				<div class="grid gap-2">
					<label for="name" class="text-sm font-medium text-gray-700">Name</label>
					<input
						id="name"
						bind:value={name}
						type="text"
						required
						class="rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-600 focus:ring-green-600"
						placeholder="Your name"
					/>
				</div>

				<div class="grid gap-2">
					<label for="email" class="text-sm font-medium text-gray-700">Email</label>
					<input
						id="email"
						bind:value={email}
						type="email"
						required
						class="rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-600 focus:ring-green-600"
						placeholder="you@example.com"
					/>
				</div>

				<div class="grid gap-2">
					<label for="message" class="text-sm font-medium text-gray-700">Message</label>
					<textarea
						id="message"
						bind:value={message}
						rows="5"
						required
						class="rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-green-600 focus:ring-green-600"
						placeholder="Type your message here..."
					></textarea>
				</div>

				<div>
					<button
						type="submit"
						class="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-green-700"
					>
						Send Message
					</button>
				</div>
			</form>
		</div>
	</div>
</section>

<Footer />

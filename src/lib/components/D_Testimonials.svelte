<script lang="ts">
	import { onMount } from 'svelte';
	import 'swiper/swiper-bundle.css';
	import Swiper from 'swiper';

	const testimonials = [
		{
			name: 'Amina L.',
			role: 'Youth Leader, Imo State',
			text: 'Jubilee Care has brought real ICT opportunities to our community.',
			avatar: 'https://ui-avatars.com/api/?name=Amina+L&background=ffffff'
		},
		{
			name: 'Tunde K.',
			role: 'ICT Coordinator, Rivers State',
			text: 'Their support for digital identity made our center more efficient.',
			avatar: 'https://ui-avatars.com/api/?name=Tunde+K&background=ffffff'
		},
		{
			name: 'Hamza E.',
			role: 'Parent, Yobe State',
			text: 'My children got their NINs easily thanks to Jubilee’s outreach.',
			avatar: 'https://ui-avatars.com/api/?name=Hamza+E&background=ffffff'
		},
		{
			name: 'Ezinne K.',
			role: 'Health Worker, Abia State',
			text: 'We now register health staff faster with Jubilee’s assistance.',
			avatar: 'https://ui-avatars.com/api/?name=Ezinne+K&background=ffffff'
		}
	];

	onMount(() => {
		new Swiper('.swiper', {
			loop: true,
			autoplay: { delay: 5000 },
			slidesPerView: 1,
			spaceBetween: 20,
			breakpoints: {
				768: { slidesPerView: 2 },
				1024: { slidesPerView: 3 }
			}
		});
	});
</script>

<section class="overflow-hidden bg-gray-50 px-4 py-16 select-none sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl text-center">
		<h2 class="text-2xl font-bold text-gray-900">What Our Partners Say</h2>
		<p class="mx-auto mt-2 max-w-xl text-gray-600">
			Real stories from people impacted by Jubilee Care’s ICT initiatives.
		</p>

		<div class="scrollbar-none -mx-2 mt-10 overflow-x-auto sm:mx-0">
			<div class="swiper px-2 sm:px-0">
				<div class="swiper-wrapper pb-2">
					{#each testimonials as person}
						<div class="swiper-slide h-full px-1 sm:px-2">
							<div
								class="flex h-[130px] w-full flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg"
							>
								<p class="-mb-8 line-clamp-2 text-gray-600 italic">"{person.text}"</p>

								<div class="mt-5 -mb-3 flex items-center gap-3">
									<img
										src={person.avatar}
										alt={person.name}
										class="-mt-2 h-10 w-10 rounded-full bg-white object-cover ring-2 ring-green-600 ring-offset-2 ring-offset-white"
										width="40"
										height="40"
										loading="lazy"
									/>
									<div class="text-left">
										<div class="-mt-0 max-w-[140px] truncate text-sm font-semibold text-green-800">
											{person.name}
										</div>
										<div class="text-xs text-gray-500">{person.role}</div>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

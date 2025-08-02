<!-- src/lib/components/LP/SocialHandles.svelte -->
<script lang="ts">
	const socials = [
		{ name: 'Facebook', url: 'https://facebook.com/JCGNigeria', icon: 'facebook' },
		{ name: 'TikTok', url: 'https://tiktok.com/@JCGNigeria', icon: 'tiktok' },
		{ name: 'Instagram', url: 'https://instagram.com/JCGNigeria', icon: 'instagram' },
		{ name: 'WhatsApp', url: 'https://wa.me/2347039792389', icon: 'whatsapp' },
		{ name: 'Twitter', url: 'https://twitter.com/JCGNigeria', icon: 'twitter' }
	];

	function iconSvg(name: string): string {
		const size = 24;
		const common = `width="${size}" height="${size}" fill="currentColor"`;

		const icons: Record<string, string> = {
			facebook: `<svg ${common} viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.87v-7H8v-3h2.5V9.5A3.5 3.5 0 0114 6h2v3h-2c-.3 0-.5.2-.5.5V12H16l-.5 3H13.5v7A10 10 0 0022 12z"/></svg>`,
			tiktok: `<svg ${common} viewBox="0 0 24 24"><path d="M12.76 2h2.93c.1 1.13.6 2.2 1.41 3 .79.8 1.84 1.29 2.95 1.4v3.05c-1.58-.02-3.13-.46-4.46-1.29v7.64c0 2.8-2.4 5.2-5.2 5.2S5.2 19.6 5.2 16.8s2.4-5.2 5.2-5.2c.23 0 .47.02.7.06v3.16a2.17 2.17 0 00-.7-.1c-1.17 0-2.1.94-2.1 2.1s.93 2.1 2.1 2.1 2.1-.93 2.1-2.1V2z"/></svg>`,
			instagram: `<svg ${common} viewBox="0 0 24 24"><path d="M7 2C4.8 2 3 3.8 3 6v12c0 2.2 1.8 4 4 4h10c2.2 0 4-1.8 4-4V6c0-2.2-1.8-4-4-4H7zm10 2c1.1 0 2 .9 2 2v2h-2V4zM5 6c0-1.1.9-2 2-2h2v2H5V6zm0 2h2v2H5V8zm0 4h2v2H5v-2zm0 4h2v2H5v-2zm4 2H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm2-2h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V6h2v2z"/></svg>`,
			whatsapp: `<svg ${common} viewBox="0 0 24 24"><path d="M20 4a9.9 9.9 0 00-17 7c0 1.7.5 3.4 1.5 4.8L3 21l5.4-1.4A9.9 9.9 0 0020 4zM9 7c-.2-.6-.5-.6-.7-.6H8c-.2 0-.4 0-.6.3-.3.3-.8.7-.8 1.8s.8 2 1 2.2c.1.1 1.5 2.5 3.7 3.4 1.3.5 1.6.4 2 .3.4 0 1-.5 1.1-.9.1-.4.1-.7 0-.8l-.4-.2c-.3-.2-.8-.4-.9-.4-.2 0-.4.1-.5.3l-.3.5c-.1.2-.2.2-.4.1-.2 0-1-.4-1.9-1.2a7.3 7.3 0 01-1.3-1.8c-.1-.2 0-.3.1-.4l.3-.3c.1-.2.2-.3.2-.5s-.2-.5-.3-.6l-.7-.3z"/></svg>`,
			twitter: `<svg ${common} viewBox="0 0 24 24"><path d="M22.46 6c-.77.34-1.6.57-2.46.67a4.3 4.3 0 001.88-2.37 8.58 8.58 0 01-2.72 1.04 4.27 4.27 0 00-7.3 3.9A12.1 12.1 0 013 4.8a4.27 4.27 0 001.32 5.7 4.24 4.24 0 01-1.93-.53v.05a4.27 4.27 0 003.43 4.18c-.43.12-.88.17-1.34.17-.32 0-.65-.03-.96-.1a4.27 4.27 0 003.98 2.96A8.6 8.6 0 013 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2v-.56c.84-.6 1.57-1.35 2.14-2.2z"/></svg>`
		};

		return icons[name] || '';
	}
</script>

<section class="bg-white px-6 pt-10 pb-6">
	<div class="mx-auto max-w-6xl text-center">
		<h2 class="mb-4 text-lg font-semibold text-gray-900">Follow Us & Stay Connected</h2>

		<div class="flex justify-center gap-6 text-gray-500">
			{#each socials as { name, url, icon }}
				<a
					href={url}
					aria-label={`Follow us on ${name}`}
					target="_blank"
					rel="noopener noreferrer"
					class="transform transition hover:scale-110 hover:text-red-600"
				>
					{@html iconSvg(icon)}
				</a>
			{/each}
		</div>
	</div>
</section>

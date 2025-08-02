<script lang="ts">
	import { onDestroy } from 'svelte';
	// ✅ Correct import from lib/store
	import notificationStore from '$lib/store/notification';
	import type { NotificationType } from '$lib/store/notification';

	let message = '';
	let type: NotificationType = 'info';
	let visible = false;
	let timeout: ReturnType<typeof setTimeout>;

	const unsubscribe = notificationStore.subscribe((notif) => {
		if (notif) {
			message = notif.message;
			type = notif.type;
			visible = true;

			clearTimeout(timeout);
			timeout = setTimeout(() => (visible = false), notif.duration ?? 4000);
		}
	});

	onDestroy(() => {
		unsubscribe();
		clearTimeout(timeout);
	});
</script>

{#if visible}
	<div class={`notification ${type}`}>
		<span>{message}</span>
		<button on:click={() => (visible = false)}>×</button>
	</div>
{/if}

<style>
	.notification {
		position: fixed;
		top: 4rem;
		right: .1rem;
		bottom: auto;
		padding: 0.5rem 1rem; /* reduced height */
		border-radius: 0.375rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		color: white;
		font-size: 0.875rem; /* reduced font size */
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem; /* slightly reduced gap */
		z-index: 9999;
		min-width: 220px;
		max-width: 300px;
	}

	.notification.success {
		background-color: #22c55e;
	}
	.notification.error {
		background-color: #ef4444;
	}
	.notification.info {
		background-color: #3b82f6;
	}
	.notification.warning {
		background-color: #f59e0b;
	}

	button {
		background: transparent;
		border: none;
		font-size: 1rem;
		cursor: pointer;
		color: white;
		line-height: 1;
		padding: 0;
	}
</style>

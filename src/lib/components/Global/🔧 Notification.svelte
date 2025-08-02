<script lang="ts">
	export let message = '';
	export let type: 'success' | 'error' | 'info' = 'info';
	export let duration = 4000;

	let visible = true;

	const close = () => (visible = false);

	$: if (message) {
		visible = true;
		setTimeout(() => (visible = false), duration);
	}
</script>

{#if visible}
	<div class={`notification ${type}`}>
		<span>{message}</span>
		<button on:click={close} aria-label="Close">×</button>
	</div>
{/if}

<style>
	.notification {
		position: fixed;
		top: 1rem;
		right: 1rem;
		padding: 1rem 1.5rem;
		border-radius: 0.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		color: white;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		z-index: 9999;
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

	button {
		background: transparent;
		border: none;
		font-size: 1.25rem;
		cursor: pointer;
		color: white;
	}
</style>

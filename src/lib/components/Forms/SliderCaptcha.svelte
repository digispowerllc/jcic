<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { notifySuccess, notifyError } from '$lib/store/notification';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();
  const loading = writable(true);
  let bgSrc = '';
  let pieceSrc = '';
  let pieceX = 0;
  let isSolved = false;
  let sliderX = 0;
  let container: HTMLDivElement;

  onMount(async () => {
    try {
      const res = await fetch('/captcha/slider');
      const data = await res.json();

      bgSrc = data.bg;
      pieceSrc = data.piece;
      pieceX = data.x;
      loading.set(false);
    } catch (e) {
      notifyError('Failed to load CAPTCHA');
    }
  });

  function onDrag(e: MouseEvent | TouchEvent) {
    if (isSolved) return;
    let clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const rect = container.getBoundingClientRect();
    sliderX = Math.max(0, Math.min(clientX - rect.left, rect.width - 50));
  }

  function onDragEnd() {
    const tolerance = 5;
    if (Math.abs(sliderX - pieceX) <= tolerance) {
      isSolved = true;
      notifySuccess('Captcha solved');
      dispatch('solved');
    } else {
      notifyError('Try again');
      sliderX = 0;
    }
  }

  function onMouseDown(e: MouseEvent) {
    const target = e.currentTarget as HTMLDivElement | null;
    const pointerEvent = e as PointerEvent;
    if (target && typeof pointerEvent.pointerId !== 'undefined' && target.setPointerCapture) {
      target.setPointerCapture(pointerEvent.pointerId);
    }
  }
</script>

{#if $loading}
  <div class="text-center py-6">Loading...</div>
{:else}
    <div
      bind:this={container}
      class="mt-3 h-10 bg-gray-100 rounded-full border flex items-center cursor-pointer relative"
      role="slider"
      aria-valuenow={sliderX}
      aria-valuemin="0"
      aria-valuemax={container ? container.getBoundingClientRect().width - 50 : 100}
      tabindex="0"
      on:mousedown|preventDefault={onMouseDown}
      on:mousemove|preventDefault={onDrag}
      on:mouseup|preventDefault={onDragEnd}
      on:touchmove|preventDefault={onDrag}
      on:touchend|preventDefault={onDragEnd}
    >
      <div
        class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow"
        style="transform: translateX({sliderX}px);"
      >
        ☰
      </div>
    </div>
{/if}

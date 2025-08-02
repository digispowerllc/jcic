// File: src/routes/captcha/slider/+page.svelte

<script lang="ts">
  let verified = false;
  let dragging = false;
  let left = 0;
  let startX = 0;

  function startDrag(event: MouseEvent) {
    dragging = true;
    startX = event.clientX;
  }

  function drag(event: MouseEvent) {
    if (!dragging) return;
    const diff = event.clientX - startX;
    left = Math.max(0, Math.min(280, diff));
  }

  function stopDrag() {
    dragging = false;
    if (left > 260) verified = true;
  }
</script>

<div class="w-full max-w-md p-4 bg-white rounded shadow">
  <div class="text-sm font-medium mb-2">Drag to verify</div>
  <div class="relative h-10 bg-gray-100 rounded-full">
    <div class="absolute inset-0 rounded-full border border-gray-300"></div>
    <div
      class="absolute h-10 w-10 bg-blue-500 rounded-full cursor-pointer"
      style="left: {left}px"
      on:mousedown={startDrag}
      on:mousemove={drag}
      on:mouseup={stopDrag}
    ></div>
  </div>
  {#if verified}
    <p class="mt-3 text-green-600">Verified ✅</p>
  {/if}
</div>

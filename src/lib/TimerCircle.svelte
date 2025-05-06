<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  export let duration = 60; // 전체 시간(초)
  let timeLeft = duration;
  let interval: number;

  // 원형 프로그레스바 관련
  const radius = 48;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  $: progress = 1 - timeLeft / duration;
  $: dashOffset = circumference * progress;

  function formatTime(sec: number) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function start() {
    clearInterval(interval);
    timeLeft = duration;
    interval = window.setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
      } else {
        clearInterval(interval);
      }
    }, 1000);
  }

  onMount(() => {
    start();
  });
  onDestroy(() => {
    window.clearInterval(interval);
  });
</script>

<div class="flex flex-col items-center justify-center">
  <div class="relative w-32 h-32">
    <svg class="w-full h-full" viewBox="0 0 96 96">
      <circle
        cx="48" cy="48" r={normalizedRadius}
        fill="none"
        stroke="#e5e7eb"
        stroke-width={stroke}
      />
      <circle
        cx="48" cy="48" r={normalizedRadius}
        fill="none"
        stroke="#3b82f6"
        stroke-width={stroke}
        stroke-dasharray={circumference}
        stroke-dashoffset={dashOffset}
        stroke-linecap="round"
        style="transition: stroke-dashoffset 0.5s linear;"
      />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-2xl font-mono font-bold">{formatTime(timeLeft)}</span>
    </div>
  </div>
  <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" on:click={start}>
    리셋
  </button>
</div> 
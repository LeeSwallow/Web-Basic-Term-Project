<script lang="ts">
    import { onMount } from 'svelte';

    let duration = 60;
    let timeLeft = duration;
    let interval: number;
    let stroke = 8;
    let size = 160; // SVG 전체 크기(px)
    let radius = (size / 2) - (stroke / 2); // stroke가 잘리지 않게
    let circumference = 2 * Math.PI * radius;
    let dashOffset = circumference - (circumference * timeLeft) / duration;

    let formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function start() {
        clearInterval(interval);
        timeLeft = duration;
        interval = window.setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                window.clearInterval(interval);
            }
        }, 1000);
    }

    // dashOffset을 타이머가 변할 때마다 갱신
    $: dashOffset = circumference - (circumference * timeLeft) / duration;
</script>

<div class="flex flex-col items-center justify-center m-5">
  <div class="relative" style="width: {size}px; height: {size}px;">
    <svg class="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size/2} cy={size/2} r={radius}
        fill="none"
        stroke="#e5e7eb"
        stroke-width={stroke}
      />
      <circle
        cx={size/2} cy={size/2} r={radius}
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
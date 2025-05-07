<script lang="ts">
    import { Timer, type TimerSnapshot, TimerState } from "$lib/models/Timer";

    let { duration = 25 * 60 * 1000, intervalTime = 1000, size=160, stroke=8 } = $props();
  
    let radius = (size / 2) - (stroke / 2); // stroke가 잘리지 않게
    let circumference = 2 * Math.PI * radius;
    
    let dashOffset: number = $state(0);
    let timeLeft:number = $state(duration);
    let timerState: TimerState = $state(TimerState.IDLE);
    
    let timer: Timer = $state(new Timer({timerValue: { duration, intervalTime }}));

    let formatTime = (timeMil: number) => {
        const time = timeMil / 1000;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    timer.event = {
      // dashOffset을 타이머가 변할 때마다 갱신
      onTick: (timerClock) => {
        timeLeft = timerClock.lastTime;
        dashOffset = circumference - (circumference * timeLeft) / duration;
        console.log(timeLeft, dashOffset);
      },
      onChanged: (state : TimerState) => {
        timeLeft = timer.clock.lastTime;
        dashOffset = circumference - (circumference * timeLeft) / duration;
        console.log(state);
        timerState = state;
      },
      onFinish: () => {
        // 타이머가 끝났을 때 실행
        console.log("타이머가 끝났습니다.");
      }
    }
</script>

<div class="flex flex-col items-center justify-between m-5">
    
  <div class="relative" style="width: {size}px; height: {size}px;">
    <svg class="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size/2} cy={size/2} r={radius}
        fill="none"
        stroke="var(--color-base-100)"
        stroke-width={stroke}
      />
      <circle
        cx={size/2} cy={size/2} r={radius}
        fill="none"
        stroke="var(--color-error)"
        stroke-width={stroke}
        stroke-dasharray={circumference}
        stroke-dashoffset={dashOffset}
        stroke-linecap="round"
        style="transition: stroke-dashoffset 0.5s linear;"
      />
    </svg>

    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-3xl font-mono font-bold">{formatTime(timeLeft)}</span>
    </div>
  </div>


  <div class="flex flex-row gap-2 m-5 w-[50%]">
    {#if timerState === TimerState.IDLE}
    <button class="btn btn-soft btn-primary flex-1" onclick={() => timer.start()}>시작</button>
    
    {:else if timerState === TimerState.RUNNING}
      <button class="btn btn-soft btn-error flex-1" onclick={() => timer.pause()}>일시정지</button>
    
    {:else if timerState === TimerState.PAUSED}
      <button class="btn btn-soft btn-primary flex-1" onclick={() => timer.resume()}>재시작</button>
      <button class="btn btn-soft btn-error flex-1" onclick={() => timer.reset()}>리셋</button>
    
    {:else if timerState === TimerState.FINISHED}
      <button class="btn btn-soft btn-primary flex-1" onclick={() => timer.reset()}>리셋</button>
    {/if}
  </div>
</div> 
<script lang="ts">
	import '../app.css';
  import { userStore } from '$lib/store/userStore';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { User } from '$lib/store/userStore';

  let { children } = $props();
  let isLogin = $state(false);
 
  let user = $state<User | null>(null);
 
  onMount(() => {
    userStore.subscribe((value) => {
      isLogin = value !== null;
      user = value;
    });

  });
</script>

<header class="header">
	<button class="btn btn-ghost btn-square text-2xl font-bold w-60 text-center" onclick={() => {
		goto('/');
	}}>Pomodoro Todo
	</button>

  {#if isLogin}
    <div class="text-2xl font-bold">{user?.name}</div>
    <button class="btn btn-square btn-ghost m-1 w-20" onclick={() => {
      goto('/auth/logout');
    }}>로그아웃</button>S
  {:else}
    <div>
    <button class="btn btn-square btn-ghost m-1 w-20" onclick={() => {
      goto('/auth/login');
    }}>로그인</button>
    <button class="btn btn-square btn-ghost m-1 w-20" onclick={() => {
      goto('/auth/signup');
    }}>회원가입</button>
    </div>
  {/if}

</header>

<article class="content">
	{@render children()}
</article>
<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>


<style lang="postcss">
	@reference  'tailwindcss';
	@plugin "daisyui" { themes: light --default, dark --prefersdark; }

	.header {
		@apply bg-base-100 flex justify-between items-center;
		position: fixed;
		width: 100%;
		height: 8vh;
		padding: 1rem;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	}

  .content {
  @apply bg-base-100;
  border-radius:.25em;
  box-shadow:0 0 .25em rgba(0,0,0,.25);
  box-sizing:border-box;
  left:50%;
  top:60%;
  margin: 4vh auto;
  min-height: 50vh;
  padding: 1rem;

  position:absolute;
  text-align:center;
  transform:translate(-50%, -50%);
}
  
.bg {
  animation:slide 6s ease-in-out infinite alternate;
  background-image: linear-gradient(-60deg, var(--color-warning) 50%, var(--color-error) 50%);
  bottom:0;
  left:-50%;
  opacity:.5;
  position:fixed;
  right:-50%;
  top:0;
  z-index:-1;
}

.bg2 {
  animation-direction:alternate-reverse;
  animation-duration:8s;
}

.bg3 {
  animation-duration:10s;
}

@keyframes slide {
  0% {
    transform:translateX(-25%);
  }
  100% {
    transform:translateX(25%);
  }
}
</style>
<script lang="ts">
	import '../app.css';
  import { userStore } from '$lib/store/userStore';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import type { UserInfo } from '$lib/client/auth';

  let { children } = $props();

  let isLogin = $state(false);
  let user = $state<UserInfo | null>(null);

  const onClickSignup = () => { goto('/auth/signup')}
  const onClickLogin = () => { goto('/auth/login') }
  let onClickLogout : () => void;

  onMount(() => {
    userStore.subscribe((value) => { 
      user = (value === undefined || value === null) ? null : value;
      isLogin = (user !== null);
    });
    onClickLogout = () => {
      fetch('/api/sessions', {
        method: 'DELETE',
      }).then((res) => {
        if (res.ok) {
          userStore.set(null);
          goto("/");
        } else {
          console.error(res);
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  });
</script>

<header class="header">
	<button class="btn btn-ghost btn-square text-2xl font-bold w-60 text-center" onclick={() => {
		goto('/');
	}}>Pomodoro Todo
	</button>

  {#if isLogin}
  <div class="flex items-center">
    <div><span class="font-bold">사용자 이름:  </span> {user?.name}</div>
    <button class="btn btn-square btn-ghost m-1 w-20" onclick={() => onClickLogout()}>로그아웃</button>
  </div>
  {:else}
    <div>
    <button class="btn btn-square btn-ghost m-1 w-20" onclick={() => onClickLogin()}>로그인</button>
    <button class="btn btn-square btn-ghost m-1 w-20" onclick={() => onClickSignup()}>회원가입</button>
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
		height: 4rem;
		padding: 1rem;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		box-shadow: 0 3px 3px rgba(0,0,0,0.2);
	}

  .content {
  @apply bg-base-100 overflow-y-auto;
  box-shadow:0 0 .25em rgba(0,0,0,.25);
  border-radius:.25em;
  box-sizing:border-box;
  position:absolute;
  left:50%;
  top:55%;
  margin: 0 auto;

  min-height: 50vh;
  max-height: 85vh;
  
  padding: 1rem;
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
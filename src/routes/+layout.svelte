<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<header class="header">
	<div class="text-2xl font-bold">
		Pomodoro Todo
	</div>
</header>

<div class="bg"></div>
<div class="bg bg2"></div>
<div class="bg bg3"></div>
<div class="content">
	{@render children()}
</div>

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
  margin-top: 4vh;
  min-height: 80vh;
  min-width: 50vw;
  left:50%;
  top:50%;
  position:fixed;
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
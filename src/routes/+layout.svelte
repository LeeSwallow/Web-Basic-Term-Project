<script lang="ts">
	import '../app.css';
	import Navbar from '../Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />

<div class="card bg-base-100 shadow-xl w-[80%] min-h-[100vh] p-[1rem] m-[10vh]">
	{@render children()}
</div>

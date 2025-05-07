<script lang="ts">
    import Timer from "$lib/components/Timer.svelte";
</script>

<h1>Timer</h1>
<Timer duration={1 * 60 * 1000} intervalTime={1000} size={240} stroke={8}/>
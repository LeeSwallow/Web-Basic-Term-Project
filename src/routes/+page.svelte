<script lang="ts">
    import { onMount } from "svelte";
    import { userStore } from "$lib/store/userStore";
    let { user } = $props();

    onMount(() => {
        userStore.set(user);
    });
</script>

<h1>뽀모도로 Todo List 에 오신걸 환영합니다!</h1>

<p>
    Todo List 를 사용하여 효율적인 일정 관리를 할 수 있습니다.
</p>

<p>
    일정의 완료를 뽀모도로 타이머를 사용하여 효율적으로 관리할 수 있습니다.
</p>

<p>
    뽀모도로 타이머를 사용하여 효율적인 일정 관리를 할 수 있습니다.
</p>

<p>
    뽀모도로 타이머를 사용하여 효율적인 일정 관리를 할 수 있습니다.
</p>
<!-- <script lang="ts">
    import { todos } from './+page';
</script>

<div class="flex flex-col min-w[500px] w-[70vw] h-[100vh] max-h-[120vh]">
    <h1 class="text-xl font-bold mb-4">Todo List</h1>
    <div class="bg-white rounded-lg shadow p-4 mb-4">
        <div class="flex gap-2">
            <input
                type="text"
                bind:value={newTodo}
                placeholder="새로운 할 일을 입력하세요"
                class="flex-1 px-2 py-1 border rounded input input-bordered"
                on:keydown={(e) => e.key === "Enter" && addTodo()}
            />
            <button
                on:click={addTodo}
                class="px-3 py-1 bg-blue-500 text-white rounded"
            >
                추가
            </button>
        </div>
    </div>

    <div class="rounded-lg p-4 flex-1">
        <div class="mb-6 bg-white rounded-lg shadow">
            <button class="w-full flex items-center gap-2 px-4 py-3 font-semibold text-left rounded-t-lg hover:bg-gray-100 transition" on:click={() => openTodo = !openTodo}>
                <svg class="w-5 h-5 transition-transform" style:transform={openTodo ? 'rotate(90deg)' : 'rotate(0deg)'} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
                <span>할 일</span>
            </button>
            {#if openTodo}
                <div class="bg-gray-100 rounded-b-lg px-2 py-2">
                    <ul class="space-y-2 overflow-y-auto max-h-64 pr-2">
                        {#each $todos.filter(todo => !todo.completed) as todo (todo.id)}
                            <li class="flex items-center gap-2 bg-white rounded-lg shadow p-3">
                                <input type="checkbox" checked={todo.completed} on:change={() => toggleTodo(todo.id)}/>
                                <span>{todo.text}</span>
                                <button on:click={() => deleteTodo(todo.id)} class="ml-auto text-red-500 hover:underline">
                                    삭제
                                </button>
                            </li>
                        {/each}
                        {#if $todos.filter(todo => !todo.completed).length === 0}
                            <li class="text-gray-400 text-sm text-center">할 일이 없습니다.</li>
                        {/if}
                    </ul>
                </div>
            {/if}
        </div>
    </div>
</div>
 -->

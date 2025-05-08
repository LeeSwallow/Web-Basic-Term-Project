import { onMount } from 'svelte';
import { writable } from 'svelte/store';

export const todos = writable([]);

onMount(() => {
    fetch('/api/todos/me')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load todos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            todos.set(data);
        })
        .catch(error => {
            console.error('Error loading todos:', error);
        });
});

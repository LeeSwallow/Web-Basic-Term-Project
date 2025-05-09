export const addTodo = (todo: string) => {
    const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ todo }),
    });
    if (!res.ok) {
        throw new Error('Failed to add todo');
    }
    
    return res.json();
}


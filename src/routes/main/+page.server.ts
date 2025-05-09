import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    if (!locals?.user) {
        throw redirect(302, "/");
    }
    const res = await fetch('/api/todos/me');
    if (!res.ok) { throw redirect(302, "/")}
    const todos = await res.json();
    return { todos };
}

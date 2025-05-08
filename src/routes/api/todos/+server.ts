import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { todos } from "$lib/server/db/schema";
import { db } from "$lib/server/db";

export const GET: RequestHandler = async () => {
    const todos = await db.query.todos.findMany();
    return json(todos);
};

export const POST: RequestHandler = async ({ request }) => {
    const body = await request.json();
    const newTodo = await db.insert(todos).values(body);
    return json(newTodo);
};
import type { RequestHandler } from "@sveltejs/kit";
import { todos } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
    if (!params.id) {
        return json({ error: "Todo ID is required" }, { status: 400 });
    }
    const todo = await db.query.todos.findFirst({ where: eq(todos.id, params.id) });
    return json(todo);
};

export const PATCH: RequestHandler = async ({ request, params }) => {
    const body = await request.json();
    if (!params.id) {
        return json({ error: "Todo ID is required" }, { status: 400 });
    }
    const updatedTodo = await db.update(todos).set(body).where(eq(todos.id, params.id));
    return json(updatedTodo);
};

export const DELETE: RequestHandler = async ({ params }) => {
    if (!params.id) {
        return json({ error: "Todo ID is required" }, { status: 400 });
    }
    const deletedTodo = await db.delete(todos).where(eq(todos.id, params.id));
    return json(deletedTodo);
};



import { json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { todos } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ locals }) => {
    const user_id = locals.user?.id;
    if (!user_id) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }
    const userTodos = await db.query.todos.findMany({ where: eq(todos.userId, user_id) });
    return json(userTodos);
};

export const POST: RequestHandler = async ({ request, locals }) => {
    const user_id = locals.user?.id;
    if (!user_id) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const id = crypto.randomUUID();
    const newTodo = await db.insert(todos).values({ id, ...body, userId: user_id });
    return json(newTodo);
};

export const PATCH: RequestHandler = async ({ request, locals }) => {
    const user_id = locals.user?.id;
    if (!user_id) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const updatedTodo = await db.update(todos).set(body).where(eq(todos.id, body.id));
    return json(updatedTodo);
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
    const user_id = locals.user?.id;
    if (!user_id) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const deletedTodo = await db.delete(todos).where(eq(todos.id, body.id));
    return json(deletedTodo);
};

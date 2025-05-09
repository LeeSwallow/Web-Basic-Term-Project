import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { todos } from "$lib/server/db/schema";
import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";

// 사용자 todo 가져오기
// GET /api/todo
export const GET: RequestHandler = async ({ locals }) => {
    const { user } = locals;
    if (!user) {
        return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    }
    const userTodos = await db.query.todos.findMany({ where: eq(todos.userId, user.id) });
    return json(userTodos);
};

// 사용자 todo 추가
// POST /api/todo
export const POST: RequestHandler = async ({ request, locals }) => {
    const { user } = locals;
    if (!user) {
        return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    }
    const body = await request.json();
    const newTodo = await db.insert(todos).values({ ...body, userId: user.id });
    return json(newTodo);
};
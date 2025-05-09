import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { todos } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// 사용자 todo 조회
// GET /api/todos/:id
export const GET: RequestHandler = async ({ params, locals }) => {
    const { user } = locals;
    if (!user) return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    if (!params.id) return new Response(JSON.stringify({ message: "ID가 필요합니다." }), { status: 400 });
    
    const targetTodo = await db.query.todos.findFirst({ where: eq(todos.id, params.id) });
    if (!targetTodo) return new Response(JSON.stringify({ message: "해당 Todo를 찾을 수 없습니다." }), { status: 404 });
    if (targetTodo.userId !== user.id) return new Response(JSON.stringify({ message: "해당 todo에 접근할 권한이 없습니다." }), { status: 403 });

    return json(targetTodo);
};


// 사용자 todo 수정
// PATCH /api/todos/:id
export const PATCH: RequestHandler = async ({ request, params, locals }) => {
    const { user } = locals;

    if (!user) return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    if (!params.id) return new Response(JSON.stringify({ message: "ID가 필요합니다." }), { status: 400 });
    const targetTodo = await db.query.todos.findFirst({ where: eq(todos.id, params.id) });
    if (!targetTodo) return new Response(JSON.stringify({ message: "해당 Todo를 찾을 수 없습니다." }), { status: 404 });
    if (targetTodo.userId !== user.id) return new Response(JSON.stringify({ message: "해당 todo에 접근할 권한이 없습니다." }), { status: 403 });

    const body = await request.json();
    const updatedTodo = await db.update(todos).set(body).where(eq(todos.id, params.id));
    return json(updatedTodo);
};

// 사용자 todo 삭제
// DELETE /api/todos/:id
export const DELETE: RequestHandler = async ({ params , locals}) => {
    const { user } = locals;
    if (!user) return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    if (!params.id) return new Response(JSON.stringify({ message: "ID가 필요합니다." }), { status: 400 });
    const targetTodo = await db.query.todos.findFirst({ where: eq(todos.id, params.id) });
    if (!targetTodo) return new Response(JSON.stringify({ message: "해당 Todo를 찾을 수 없습니다." }), { status: 404 });
    if (targetTodo.userId !== user.id) return new Response(JSON.stringify({ message: "해당 todo에 접근할 권한이 없습니다." }), { status: 403 });

    const deletedTodo = await db.delete(todos).where(eq(todos.id, params.id));
    return json(deletedTodo);
};
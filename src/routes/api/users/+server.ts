import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// 회원가입
export const POST: RequestHandler = async ({ request }) => {
    const { name, email, password } = await request.json();
    const sameEmail = await db.select().from(users).where(eq(users.email, email));
    if (sameEmail.length > 0) {
        return new Response(JSON.stringify({ message: "중복된 이메일입니다.", field: "email" }), { status: 400 });
    }

    const id = crypto.randomUUID();
    const user = await db.insert(users).values({id, name, email, password });
    return new Response(JSON.stringify(user));
};

// 회원 정보 조회
export const GET: RequestHandler = async ({ locals }) => {
    const { user } = locals;
    if (!user) {
        return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    }
    const userInfo = await db.select().from(users).where(eq(users.id, user.id));
    return new Response(JSON.stringify(userInfo));
};


// 회원 정보 수정
export const PUT: RequestHandler = async ({ request, locals }) => {
    const { user } = locals;
    if (!user) {
        return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    }
    const { name, email, password } = await request.json();
    const userInfo = await db.update(users).set({ name, email, password }).where(eq(users.id, user.id));
    return new Response(JSON.stringify(userInfo));
};

// 회원 정보 삭제
export const DELETE: RequestHandler = async ({ request, locals }) => {
    const { user } = locals;
    if (!user) {
        return new Response(JSON.stringify({ message: "로그인이 필요합니다." }), { status: 401 });
    }
    const userInfo = await db.delete(users).where(eq(users.id, user.id));
    return new Response(JSON.stringify(userInfo));
};  


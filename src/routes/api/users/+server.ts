import type { RequestHandler } from "./$types";
import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

// 이 api외에는 토큰 없이 접근 불가(hooks.server.ts 참고)
// POST /api/users
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

// GET /api/users
export const GET: RequestHandler = async ({ locals }) => {
    const { user } = locals;
    return new Response(JSON.stringify(user));
};
import { db } from "$lib/server/db";
import { users, session } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";
import { createSession, generateSessionToken } from "$lib/server/auth";
// POST /api/sessions


// 로그인 & 시 세션 생성
export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });
    console.log(user);
    if (!user || password !== user.password) {
        console.log('Invalid credentials');
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const sessionToken = generateSessionToken();
    await createSession(sessionToken, user.id);
    // 세션 token 반환
    return new Response(JSON.stringify({ token: sessionToken }));
}

// 로그아웃 & 세션 삭제
export const DELETE: RequestHandler = async ({ locals }) => {
    const sessionToken = locals.session?.id;
    if (!sessionToken) {
        return new Response(JSON.stringify({ message: "No session token" }), { status: 401 });
    }
    await db.delete(session).where(eq(session.id, sessionToken));
    return new Response(JSON.stringify({ message: "Logged out" }), { status: 200 });
}
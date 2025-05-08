import { db } from "$lib/server/db";
import { users } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { RequestHandler } from "./$types";
import { createSession, generateSessionToken } from "$lib/server/auth";
// POST /api/sessions


// 로그인 & 회원가입 시 세션 생성
export const POST: RequestHandler = async ({ request }) => {
    const { email, password } = await request.json();
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });
    if (!user || password !== user.password) {
        return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);

    // 세션 token과 expiredAt 반환
    return new Response(JSON.stringify({ session }));
}

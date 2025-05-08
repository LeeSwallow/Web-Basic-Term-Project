import type { Handle } from '@sveltejs/kit';
import * as auth from '$lib/server/auth.js';
const publicRoutes = ['/auth', '/'];
const apiPublicRoutes = [{ path: '/api/users', methods: ['POST']}];

const handleAuth: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname;
	const method = event.request.method;

	// 공공 라우트 처리
	if (publicRoutes.includes(path)) {
		return await resolve(event);
	}

	// api 공공 라우트 처리
	if (apiPublicRoutes.some(route => route.path === path && route.methods.includes(method))) {
		return await resolve(event);
	}

	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = handleAuth;

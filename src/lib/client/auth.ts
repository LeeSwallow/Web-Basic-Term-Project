import { browser } from "$app/environment";

const sessionCookieName = 'auth-session';

export async function hashPassword(password: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(password);
	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
};

export async function setSessionTokenCookie(sessionToken: string) {
	if (browser) {
		document.cookie = `${sessionCookieName}=${sessionToken}; path=/;`;
	}
};

export type UserInfo = {
    id: string;
    name: string;
};


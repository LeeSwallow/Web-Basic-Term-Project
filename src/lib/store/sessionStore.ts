import { writable } from 'svelte/store';
import type { Session, User } from '$lib/server/db/schema';

export const session = writable<Session | null>(null);
export const user = writable<User | null>(null);
import { writable } from "svelte/store";
import type { UserInfo } from "$lib/client/auth";

export const userStore = writable<UserInfo | null>(null);

export const setUser = (newUser: UserInfo) => {
    userStore.set(newUser);
}


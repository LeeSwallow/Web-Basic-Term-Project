import { writable } from "svelte/store";

export interface User {
    id: string;
    name: string;
}

export const userStore = writable<User | null>(null);

export const setUser = (newUser: User) => {
    userStore.set(newUser);
}


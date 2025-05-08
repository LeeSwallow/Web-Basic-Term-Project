import type { ServerLoad } from "@sveltejs/kit";
import type { User } from "$lib/store/userStore";

export const load: ServerLoad = async ({ locals }: { locals: App.Locals }) => {
    const user = locals.user as User;
    return { user };
}
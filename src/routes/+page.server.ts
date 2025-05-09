import type { ServerLoad } from "@sveltejs/kit";
import type { UserInfo } from "$lib/client/auth";

export const load: ServerLoad = async ({ locals }: { locals: App.Locals }) => {
    const user = locals?.user as UserInfo;
    return { user };
}
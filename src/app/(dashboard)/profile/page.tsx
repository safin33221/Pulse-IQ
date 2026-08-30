"use server"

import Profile from "@/components/module/profile/Profile";
import { getMe } from "@/services/auth/getMe";

export default async function page() {
    const user = await getMe();
    if (!user) return null;

    return (
        <div>
            <Profile user={user as Parameters<typeof Profile>[0]["user"]} />
        </div>
    );
};

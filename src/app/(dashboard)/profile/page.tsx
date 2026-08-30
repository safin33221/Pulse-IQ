import Profile from "@/components/module/profile/Profile";
import { getMe } from "@/services/auth/getMe";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = await getMe();

    if (!user) {
        redirect("/login");
    }

    return <Profile user={user} />;
}

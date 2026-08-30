import { MobileNav } from "@/components/common/MobileNav";
import { Navbar } from "@/components/common/Navbar";
import { getMe } from "@/services/auth/getMe";
import { IUser } from "@/types/user/user.type";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user: IUser | null = await getMe();

    if (!user?.id) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar user={user} />

            <main className="pb-[74px] md:pb-0">
                {children}
            </main>

            <MobileNav />
        </div>
    );
}
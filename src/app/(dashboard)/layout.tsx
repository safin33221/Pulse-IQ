import { MobileNav } from "@/components/common/MobileNav";
import { Navbar } from "@/components/common/Navbar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pb-[74px] md:pb-0">
                {children}
            </main>

            <MobileNav />
        </div>
    );
};

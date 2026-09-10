"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ProfileAppearance } from "@/components/module/profile/ProfileAppearance";
import { ProfessionalProfile } from "@/components/module/profile/ProfessionalProfile";
import { ProfileHeader } from "@/components/module/profile/ProfileHeader";
import { ProfileReading } from "@/components/module/profile/ProfileReading";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth/logout";
import { updateMyProfile } from "@/services/user/updateUser";
import { UpdateMyProfileDto, IUser } from "@/types/user/user.type";

export default function Profile({ user }: { user: IUser }) {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [aiSummary, setAiSummary] = useState(true);
    const saveProfile = async (payload: UpdateMyProfileDto) => {
        const result = await updateMyProfile(payload);
        if (result.success) { router.refresh(); return true; }
        return false;
    };
    return <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6"><div className="mx-auto w-full max-w-300">
        <ProfileHeader user={user} onSave={saveProfile} />
        <ProfessionalProfile user={user} onSave={saveProfile} />

        <ProfileAppearance theme={theme ?? "system"} onThemeChange={setTheme} />
        <ProfileReading enabled={aiSummary} onChange={setAiSummary} />
        <form action={logout} className="mt-4"><Button type="submit" variant="outline" className="h-9 w-full rounded-full text-xs font-medium">Log out</Button></form>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">Pulse IQ · Version 1.0.0</p>
    </div></main>;
}

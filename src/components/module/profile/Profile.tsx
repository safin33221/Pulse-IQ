"use client";

import Image from "next/image";
import { useState } from "react";
import type { MouseEvent } from "react";
import { useFormStatus } from "react-dom";
import { useTheme } from "next-themes";

import { IUser } from "@/types/user/user.type";
import { Button } from "@/components/ui/button";
import { logout } from "@/services/auth/logout";
import { Camera, Check, Pencil, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import SegmentedControl from "@/components/shared/SegmentedControl";
import { Toggle } from "@/components/shared/Toggle";
import { updateUser } from "@/services/user/updateUser";



const suggestedTopics = [
    "Semiconductors",
    "Longevity Research",
    "Space Economy",
    "Housing Policy",
];

export default function Profile({ user }: { user: IUser }) {
    const { theme, setTheme } = useTheme();
    const fullName =
        user.name ||
        user.username ||
        "Pulse IQ User";

    const [isEditingName, setIsEditingName] = useState(false);
    const [name, setName] = useState(fullName);
    const [isSavingName, setIsSavingName] = useState(false);
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bio, setBio] = useState(user.bio ?? "");
    const [isSavingBio, setIsSavingBio] = useState(false);
    const handleNameEdit = () => {
        setName(fullName);
        setIsEditingName(true);
    };

    const handleNameCancel = () => {
        setName(fullName);
        setIsEditingName(false);
    };

    const handleNameSave = async () => {
        setIsSavingName(true);

        try {
            const result = await updateUser({
                name: name.trim(),
            });

            if (!result.success) {
                return;
            }

            setIsEditingName(false);
        } finally {
            setIsSavingName(false);
        }
    };



    const [aiSummary, setAiSummary] = useState(true);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const initials =
        [user.firstName, user.lastName]
            .filter(Boolean)
            .map((name) => name?.[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "AR";


    const handleBioSave = async () => {
        setIsSavingBio(true);

        try {
            const result = await updateUser({
                bio: bio.trim(),
            });

            if (!result.success) {
                return;
            }

            setIsEditingBio(false);
        } finally {
            setIsSavingBio(false);
        }
    };
    function handleAvatarEdit(event: MouseEvent<HTMLButtonElement>): void {
        event.preventDefault();

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = () => {
            const file = input.files?.[0];

            if (!file) return;

            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview((previousUrl) => {
                if (previousUrl) URL.revokeObjectURL(previousUrl);
                return previewUrl;
            });
        };

        input.click();
    }

    return (
        <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
            <div className="mx-auto w-full max-w-300">


                {/* User Info */}
                <div className="min-w-0 flex-1">
                    {isEditingName ? (
                        <form
                            onSubmit={handleNameSave}
                            className="flex items-center gap-1.5"
                        >
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                maxLength={50}
                                className="h-8 min-w-0 flex-1 px-2 text-sm font-semibold sm:text-base"
                            />

                            <Button
                                type="submit"
                                size="sm"
                                className="h-8 shrink-0 px-2.5 text-xs"
                                disabled={!name.trim() || isSavingName}
                            >
                                {isSavingName ? "Saving..." : "Save"}
                            </Button>

                            <button
                                type="button"
                                onClick={handleNameCancel}
                                disabled={isSavingName}
                                className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Cancel name edit"
                            >
                                <X className="size-3.5 sm:size-4" />
                            </button>
                        </form>
                    ) : (
                        <div className="flex items-center gap-1.5">
                            <h1 className="min-w-0 truncate text-base font-semibold leading-5  text-xl sm:leading-6">
                                {user.name}
                            </h1>

                            <button
                                type="button"
                                aria-label="Edit name"
                                onClick={handleNameEdit}
                                className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                <Pencil className="size-3 sm:size-3.5" />
                            </button>
                        </div>
                    )}

                    {/* Bio */}
                    {isEditingBio ? (
                        <form
                            onSubmit={handleBioSave}
                            className="mt-1.5 flex items-center gap-1.5"
                        >
                            <Input
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                autoFocus
                                maxLength={500}
                                placeholder="Tell us about yourself..."
                                className="h-8 min-w-0 flex-1 px-2 text-xs sm:text-sm"
                            />

                            <Button
                                type="submit"
                                size="icon"
                                disabled={isSavingBio}
                                className="size-8 shrink-0"
                                aria-label="Save bio"
                            >
                                <Check className="size-3.5 sm:size-4" />
                            </Button>

                            <button
                                type="button"
                                onClick={() => {
                                    setBio(user.bio ?? "");
                                    setIsEditingBio(false);
                                }}
                                disabled={isSavingBio}
                                className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Cancel bio edit"
                            >
                                <X className="size-3.5 sm:size-4" />
                            </button>
                        </form>
                    ) : (
                        <div className="mt-1.5 flex items-center gap-1.5">
                            <p
                                className={[
                                    "min-w-0 flex-1  text-xs leading-4  sm:text-sm sm:leading-5",
                                    user.bio
                                        ? "text-muted-foreground"
                                        : "text-muted-foreground/60",
                                ].join(" ")}
                            >
                                {user.bio || "Tell us about yourself..."}
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setBio(user.bio ?? "");
                                    setIsEditingBio(true);
                                }}
                                className="flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                aria-label="Edit bio"
                            >
                                <Pencil className="size-3 sm:size-3.5" />
                            </button>
                        </div>
                    )}

                    {/* Email */}
                    <p className="mt-1 truncate text-xs leading-4 text-muted-foreground sm:mt-1.5 sm:text-sm sm:leading-5">
                        {user.email}
                    </p>

                    {/* Stats */}
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] leading-4 text-muted-foreground sm:mt-2 sm:text-[11px]">
                        <span>{user?.interests?.length ?? 0} topics</span>

                        <span
                            aria-hidden="true"
                            className="size-0.5 shrink-0 rounded-full bg-muted-foreground/50"
                        />

                        <span>27 read this week</span>
                    </div>
                </div>

                {/* Followed Topics */}
                <ProfileSection label="FOLLOWED TOPICS">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] text-muted-foreground">
                            Followed
                        </span>

                        <button
                            type="button"
                            className="text-[10px] text-muted-foreground transition-colors hover:text-primary"
                        >
                            Browse all
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        {user.interests?.slice(0, 3).map((topic) => (
                            <TopicBadge
                                key={topic}
                                variant="active"
                            >
                                {topic}
                            </TopicBadge>
                        ))}
                    </div>

                    <p className="mb-1.5 mt-3 text-[9px] font-medium tracking-wide text-muted-foreground">
                        SUGGESTED
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {suggestedTopics.map((topic) => (
                            <TopicBadge
                                key={topic}
                                variant="suggested"
                            >
                                + {topic}
                            </TopicBadge>
                        ))}
                    </div>
                </ProfileSection>



                {/* Appearance */}
                <ProfileSection label="APPEARANCE">
                    <SegmentedControl
                        options={[
                            { label: "Light", value: "light" },
                            { label: "Dark", value: "dark" },
                        ]}
                        value={theme ?? "system"}
                        onChange={(value) => {
                            setTheme(value);
                        }}
                    />
                </ProfileSection>

                {/* Reading */}
                <ProfileSection label="READING">
                    <div className="rounded-lg border bg-card px-3 py-3">

                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-xs font-medium">
                                    Show AI summaries first
                                </p>

                                <p className="mt-0.5 text-[10px] text-muted-foreground">
                                    Open every article with the Quick Summary
                                    expanded.
                                </p>
                            </div>

                            <Toggle
                                enabled={aiSummary}
                                onClick={() =>
                                    setAiSummary((current) => !current)
                                }
                            />
                        </div>
                    </div>
                </ProfileSection>

                {/* Logout */}
                <form action={logout} className="mt-4">
                    <LogoutButton />
                </form>

                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                    Pulse IQ · Version 1.0.0
                </p>
            </div>
        </main>
    );
}

function LogoutButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant="outline"
            disabled={pending}
            className="h-9 w-full rounded-full text-xs font-medium"
        >
            {pending ? "Logging out..." : "Log out"}
        </Button>
    );
}

/* ========================================================================== */
/* Profile Section                                                            */
/* ========================================================================== */

function ProfileSection({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mt-5">
            <p className="mb-2 text-[12px] font-medium tracking-[0.12em] text-muted-foreground">
                {label}
            </p>

            {children}
        </section>
    );
}

/* ========================================================================== */
/* Topic Badge                                                                */
/* ========================================================================== */

function TopicBadge({
    children,
    variant,
}: {
    children: React.ReactNode;
    variant: "active" | "suggested";
}) {
    return (
        <span
            className={[
                "inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-medium",
                variant === "active"
                    ? "border-foreground bg-foreground text-background"
                    : "bg-card text-muted-foreground",
            ].join(" ")}
        >
            {children}
        </span>
    );
}

/* ========================================================================== */
/* Toggle                                                                     */
/* ========================================================================== */



/* ========================================================================== */
/* Segmented Control                                                          */
/* ========================================================================== */



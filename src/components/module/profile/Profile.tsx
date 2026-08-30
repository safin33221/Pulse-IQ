"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "next-themes";

import { IUser } from "@/types/user/user.type";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark" | "system";

type NotificationSetting = {
    title: string;
    description: string;
    enabled: boolean;
};

const suggestedTopics = [
    "Semiconductors",
    "Longevity Research",
    "Space Economy",
    "Housing Policy",
];

export default function Profile({ user }: { user: IUser }) {
    const { theme, setTheme } = useTheme();

    const [notifications, setNotifications] = useState<
        NotificationSetting[]
    >([
        {
            title: "Breaking news",
            description: "Only for stories our editors flag as urgent.",
            enabled: true,
        },
        {
            title: "Daily brief",
            description: "One summary each morning at 7:00.",
            enabled: true,
        },
        {
            title: "Topics you follow",
            description: "New reporting on your followed topics.",
            enabled: true,
        },
        {
            title: "Sources you follow",
            description: "Every story from sources you follow.",
            enabled: false,
        },
    ]);

    const [textSize, setTextSize] = useState<
        "Small" | "Default" | "Large"
    >("Large");

    const [aiSummary, setAiSummary] = useState(true);

    const fullName =
        [user.firstName, user.lastName]
            .filter(Boolean)
            .join(" ") ||
        user.username ||
        "Pulse IQ User";

    const initials =
        [user.firstName, user.lastName]
            .filter(Boolean)
            .map((name) => name?.[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "AR";

    const toggleNotification = (index: number) => {
        setNotifications((current) =>
            current.map((notification, i) =>
                i === index
                    ? {
                        ...notification,
                        enabled: !notification.enabled,
                    }
                    : notification,
            ),
        );
    };

    return (
        <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
            <div className="mx-auto w-full max-w-300">

                {/* User */}
                <section className="rounded-lg border bg-card px-3 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-foreground text-xs font-semibold text-background">
                            {user.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt={fullName}
                                    width={100}
                                    height={100}
                                    className="size-full object-cover"
                                />
                            ) : (
                                initials
                            )}
                        </div>

                        <div className="min-w-0">
                            <h1 className="truncate text-2xl font-semibold leading-tight">
                                {fullName}
                            </h1>

                            <p className="truncate text-xl text-muted-foreground">
                                {user.email}
                            </p>

                            <p className="mt-0.5 text-[10px] text-muted-foreground">
                                {user.interests.length} topics · 27 read this week
                            </p>
                        </div>
                    </div>
                </section>

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
                        {user.interests.slice(0, 3).map((topic) => (
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

                {/* Notifications */}
                <ProfileSection label="NOTIFICATIONS">
                    <div className="overflow-hidden rounded-lg border bg-card">
                        {notifications.map((notification, index) => (
                            <div
                                key={notification.title}
                                className={[
                                    "flex items-center justify-between gap-4 px-3 py-2.5",
                                    index !== 0 && "border-t",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div className="min-w-0">
                                    <p className="text-xl font-medium">
                                        {notification.title}
                                    </p>

                                    <p className="mt-0.5 truncate text-[14px] text-muted-foreground">
                                        {notification.description}
                                    </p>
                                </div>

                                <Toggle
                                    enabled={notification.enabled}
                                    onClick={() =>
                                        toggleNotification(index)
                                    }
                                />
                            </div>
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
                        <p className="mb-2 text-[10px] text-muted-foreground">
                            Article text size
                        </p>

                        <SegmentedControl
                            options={[
                                {
                                    label: "Small",
                                    value: "Small",
                                },
                                {
                                    label: "Default",
                                    value: "Default",
                                },
                                {
                                    label: "Large",
                                    value: "Large",
                                },
                            ]}
                            value={textSize}
                            onChange={(value) =>
                                setTextSize(
                                    value as
                                    | "Small"
                                    | "Default"
                                    | "Large",
                                )
                            }
                        />

                        <div className="my-3 border-t" />

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
                <button
                    type="button"
                    className="mt-4 flex h-8 w-full items-center justify-center rounded-full border bg-card text-xs font-medium transition-colors hover:bg-muted hover:text-primary"
                >
                    Log out
                </button>

                <p className="mt-2 text-center text-[10px] text-muted-foreground">
                    Pulse IQ · Version 1.0.0
                </p>
            </div>
        </main>
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

function Toggle({
    enabled,
    onClick,
}: {
    enabled: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={enabled}
            onClick={onClick}
            className={[
                "relative h-4 w-7 shrink-0 rounded-full transition-colors",
                enabled ? "bg-primary" : "bg-muted",
            ].join(" ")}
        >
            <span
                className={[
                    "absolute top-0.5 size-3 rounded-full bg-background shadow-sm transition-transform",
                    enabled
                        ? "translate-x-3.5"
                        : "translate-x-0.5",
                ].join(" ")}
            />
        </button>
    );
}

/* ========================================================================== */
/* Segmented Control                                                          */
/* ========================================================================== */

function SegmentedControl({
    options,
    value,
    onChange,
}: {
    options: {
        label: string;
        value: string;
    }[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="flex h-7 w-full items-center rounded-full border bg-muted/50 p-0.5">
            {options.map((option) => {
                const active = option.value === value;

                return (
                    <Button
                        key={option.value}
                        type="button"
                        variant={`secondary`}
                        onClick={() => onChange(option.value)}
                        className={[
                            "h-full flex-1 rounded-full text-[10px] font-medium transition-all",
                            active
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </div>
    );
}
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
    return (
        <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6">
            <div className="mx-auto w-full max-w-300">
                {/* User */}
                <section className="rounded-lg border bg-card px-3 py-3">
                    <div className="flex items-center gap-3">
                        <Skeleton className="size-9 shrink-0 rounded-full" />

                        <div className="min-w-0 flex-1 space-y-1.5">
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="h-5 w-56" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                    </div>
                </section>

                {/* Followed Topics */}
                <SkeletonSection>
                    <div className="mb-2 flex items-center justify-between">
                        <Skeleton className="h-3 w-14" />
                        <Skeleton className="h-3 w-16" />
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-28 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>

                    <Skeleton className="mb-1.5 mt-3 h-3 w-16" />

                    <div className="flex flex-wrap gap-1.5">
                        <Skeleton className="h-6 w-32 rounded-full" />
                        <Skeleton className="h-6 w-36 rounded-full" />
                        <Skeleton className="h-6 w-28 rounded-full" />
                        <Skeleton className="h-6 w-32 rounded-full" />
                    </div>
                </SkeletonSection>

                {/* Notifications */}
                <SkeletonSection>
                    <div className="overflow-hidden rounded-lg border bg-card">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className={[
                                    "flex items-center justify-between gap-4 px-3 py-2.5",
                                    index !== 0 && "border-t",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div className="min-w-0 flex-1 space-y-1.5">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-64 max-w-full" />
                                </div>

                                <Skeleton className="h-4 w-7 shrink-0 rounded-full" />
                            </div>
                        ))}
                    </div>
                </SkeletonSection>

                {/* Appearance */}
                <SkeletonSection>
                    <Skeleton className="h-7 w-full rounded-full" />
                </SkeletonSection>

                {/* Reading */}
                <SkeletonSection>
                    <div className="rounded-lg border bg-card px-3 py-3">
                        <Skeleton className="mb-2 h-3 w-28" />

                        <Skeleton className="h-7 w-full rounded-full" />

                        <div className="my-3 border-t" />

                        <div className="flex items-center justify-between gap-4">
                            <div className="min-w-0 flex-1 space-y-1.5">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-3 w-64 max-w-full" />
                            </div>

                            <Skeleton className="h-4 w-7 shrink-0 rounded-full" />
                        </div>
                    </div>
                </SkeletonSection>

                {/* Logout */}
                <Skeleton className="mt-4 h-8 w-full rounded-full" />

                <div className="mt-2 flex justify-center">
                    <Skeleton className="h-3 w-28" />
                </div>
            </div>
        </main>
    );
}

/* ========================================================================== */
/* Skeleton Section                                                           */
/* ========================================================================== */

function SkeletonSection({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="mt-5">
            <Skeleton className="mb-2 h-3 w-28" />

            {children}
        </section>
    );
}
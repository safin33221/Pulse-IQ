import { Skeleton } from "@/components/ui/skeleton";

function FeedSkeleton() {
    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-8">
                <Skeleton className="mb-3 h-4 w-40" />
                <Skeleton className="h-12 w-72 sm:h-14 sm:w-96" />
                <Skeleton className="mt-3 h-5 w-80 sm:w-[28rem]" />
            </div>

            {/* Categories */}
            <div className="mb-8 overflow-hidden">
                <div className="flex gap-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-8 shrink-0 rounded-full"
                            style={{
                                width: `${70 + (index % 3) * 20}px`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Top Stories heading */}
            <div className="mb-5">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="mt-2 h-4 w-56" />
            </div>

            {/* Featured story */}
            <article className="overflow-hidden rounded-2xl border bg-card">
                <Skeleton className="aspect-[16/9] w-full sm:aspect-[2/1]" />

                <div className="space-y-4 p-5 sm:p-7">
                    <Skeleton className="h-3 w-24" />

                    <Skeleton className="h-8 w-full max-w-3xl sm:h-10" />
                    <Skeleton className="h-8 w-4/5 max-w-2xl sm:h-10" />

                    <Skeleton className="h-4 w-full max-w-2xl" />
                    <Skeleton className="h-4 w-3/4 max-w-xl" />

                    <div className="flex items-center gap-3 pt-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-2" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>
            </article>

            {/* Remaining stories */}
            <div className="mt-6 divide-y">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex gap-4 py-4 first:pt-0"
                    >
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-5 w-full max-w-xl" />
                            <Skeleton className="h-4 w-4/5 max-w-lg" />
                            <Skeleton className="h-3 w-32" />
                        </div>

                        <Skeleton className="h-20 w-28 shrink-0 rounded-lg sm:h-24 sm:w-36" />
                    </div>
                ))}
            </div>
        </section>
    );
}

function SidebarSkeleton() {
    return (
        <aside className="space-y-6">
            {/* Trending */}
            <div className="rounded-2xl border bg-card p-6">
                <Skeleton className="mb-6 h-6 w-36" />

                <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex gap-4 border-b pb-5 last:border-0 last:pb-0"
                        >
                            <Skeleton className="h-7 w-7 shrink-0 rounded-md" />

                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Your Topics */}
            <div className="rounded-2xl border bg-card p-6">
                <Skeleton className="mb-6 h-6 w-32" />

                <div className="space-y-5">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    ))}
                </div>

                <Skeleton className="mt-6 h-4 w-24" />
            </div>
        </aside>
    );
}

export default function Loading() {
    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
                <FeedSkeleton />

                <div className="hidden lg:block">
                    <SidebarSkeleton />
                </div>
            </div>
        </div>
    );
}
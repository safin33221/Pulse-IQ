
export default function NewsDetailsSkeleton() {
    return (
        <main className="bg-background">
            <article className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
                {/* Back link */}
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />

                {/* Header */}
                <header className="mt-8 border-b pb-7">
                    {/* Category + date */}
                    <div className="flex gap-2">
                        <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-2 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                    </div>

                    {/* Title */}
                    <div className="mt-4 space-y-3">
                        <div className="h-10 w-full animate-pulse rounded bg-muted sm:h-12" />
                        <div className="h-10 w-4/5 animate-pulse rounded bg-muted sm:h-12" />
                    </div>

                    {/* Summary */}
                    <div className="mt-5 space-y-2">
                        <div className="h-5 w-full animate-pulse rounded bg-muted" />
                        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    </div>

                    {/* Source + button */}
                    <div className="mt-6 flex items-center justify-between gap-4">
                        <div className="space-y-2">
                            <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                            <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                        </div>

                        <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
                    </div>
                </header>

                {/* Hero image */}
                <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
                    <div className="absolute inset-0 animate-pulse bg-muted" />
                </div>

                {/* Article content */}
                <div className="mt-8 space-y-4">
                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-11/12 animate-pulse rounded bg-muted" />

                    <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />

                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />

                    <div className="h-5 w-full animate-pulse rounded bg-muted" />
                    <div className="h-5 w-10/12 animate-pulse rounded bg-muted" />
                </div>

                {/* Footer */}
                <footer className="mt-10 border-t pt-6">
                    <div className="h-10 w-48 animate-pulse rounded-md bg-muted" />
                </footer>
            </article>
        </main>
    );
}


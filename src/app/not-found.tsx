import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-16 sm:px-8">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">

                {/* Logo mark */}
                <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-foreground">
                    <div className="relative size-6">
                        <span className="absolute left-0 top-0 size-3 rounded-full bg-primary" />
                        <span className="absolute bottom-0 right-0 size-3 rounded-full bg-background" />
                    </div>
                </div>

                {/* Label */}
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    404 · Page not found
                </p>

                {/* Heading */}
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Nothing to read here.
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                    The page you’re looking for doesn’t exist or may have been
                    moved somewhere else.
                </p>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/feed"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                        <ArrowLeft className="size-4" />
                        Back to feed
                    </Link>

                    <Link
                        href="/"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-full border bg-card px-6 text-sm font-medium transition-colors hover:bg-muted"
                    >
                        <Search className="size-4" />
                        Explore Pulse IQ
                    </Link>
                </div>

                {/* Bottom hint */}
                <p className="mt-10 text-xs text-muted-foreground">
                    Stay curious. There’s always another story.
                </p>
            </div>
        </main>
    );
}
import Link from "next/link";
import { TrendingUp } from "lucide-react";

import type { NewsArticle } from "@/types/news/news.types";

interface TrendingStoriesProps {
    stories: NewsArticle[];
}

function formatRelativeTime(publishedAt: string | null): string {
    if (!publishedAt) return "Recently";

    const date = new Date(publishedAt);
    if (Number.isNaN(date.getTime())) return "Recently";

    const minutes = Math.max(
        0,
        Math.floor((Date.now() - date.getTime()) / (1000 * 60)),
    );

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
}

function estimateReadTime(story: NewsArticle): string {
    const words = `${story.summary ?? ""} ${story.content ?? ""}`
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

    return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function TrendingStories({ stories }: TrendingStoriesProps) {
    return (
        <section className="rounded-2xl border bg-card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" aria-hidden="true" />
                <h2 className="text-lg font-semibold">Latest stories</h2>
            </div>

            {stories.length > 0 ? (
                <div>
                    {stories.map((story, index) => (
                        <article
                            key={story.id}
                            className={`py-4 ${index > 0 ? "border-t" : ""}`}
                        >
                            <div className="flex gap-4">
                                <span className="shrink-0 pt-0.5 text-xl font-medium text-muted-foreground">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="min-w-0">
                                    <h3
                                        className={`text-base font-semibold leading-snug transition-colors hover:text-primary ${index === 0 ? "text-primary" : ""}`}
                                    >
                                        <Link href={`/feed/${story.id}`}>
                                            {story.title}
                                        </Link>
                                    </h3>

                                    <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                                        <span>{story.source?.name ?? "News"}</span>
                                        <span aria-hidden="true">·</span>
                                        <span>{formatRelativeTime(story.publishedAt)}</span>
                                        <span aria-hidden="true">·</span>
                                        <span>{estimateReadTime(story)}</span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <p className="py-4 text-sm text-muted-foreground">
                    No trending stories are available right now.
                </p>
            )}
        </section>
    );
}

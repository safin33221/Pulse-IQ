import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const topics = [
    { label: "For you", value: "foryou" },
    { label: "Technology", value: "technology" },
    { label: "Business", value: "business" },
    { label: "Science", value: "science" },
    { label: "Climate", value: "climate" },
    { label: "Politics", value: "politics" },
    { label: "Health", value: "health" },
    { label: "Culture", value: "culture" },
    { label: "Sports", value: "sports" },
];

type NewsArticle = {
    id: string;
    title: string;
    summary?: string | null;
    imageUrl?: string | null;
    publishedAt?: string | null;
    category?: {
        name: string;
        slug: string;
    } | null;
    source?: {
        name: string;
    } | null;
};

interface FeedHeroProps {
    news: NewsArticle[];
    activeCategory?: string;
}

export function FeedHero({
    news,
    activeCategory = "foryou",
}: FeedHeroProps) {
    const featuredStory = news[0];
    const remainingStories = news.slice(1);

    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-base">
                    Monday, August 31
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Good afternoon
                </h1>

                <p className="mt-3 text-base text-muted-foreground sm:text-xl">
                    {news.length} stories across your topics
                </p>
            </div>

            {/* Topics */}
            <div className="mb-8 overflow-x-auto scrollbar-none">
                <div className="flex w-max gap-2">
                    {topics.map((topic) => {
                        const active = activeCategory === topic.value;

                        return (
                            <Button
                                key={topic.value}
                                asChild
                                variant={active ? "default" : "outline"}
                                className={
                                    active
                                        ? "rounded-full px-5"
                                        : "rounded-full bg-background px-5"
                                }
                            >
                                <Link
                                    href={
                                        topic.value === "foryou"
                                            ? "/feed"
                                            : `/feed?category=${topic.value}`
                                    }
                                >
                                    {topic.label}
                                </Link>
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Top Stories */}
            <div>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Top Stories
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        {activeCategory === "foryou"
                            ? "Ranked for you in the last 24 hours"
                            : `Latest ${activeCategory} stories`}
                    </p>
                </div>

                {/* Empty State */}
                {!featuredStory && (
                    <div className="rounded-2xl border bg-card p-10 text-center">
                        <h3 className="text-lg font-semibold">
                            No stories found
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            There are no stories available for this category yet.
                        </p>
                    </div>
                )}

                {/* Featured Story */}
                {featuredStory && (
                    <article className="group relative overflow-hidden rounded-2xl border bg-card">
                        <Link href={`/news/${featuredStory.id}`}>
                            <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
                                {featuredStory.imageUrl ? (
                                    <Image
                                        src={featuredStory.imageUrl}
                                        alt={featuredStory.title}
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 70vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-muted" />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                <Badge className="absolute left-4 top-4 rounded-full border-0 px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
                                    ● Breaking
                                </Badge>

                                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/70">
                                        {featuredStory.category?.name ?? "News"}
                                    </p>

                                    <h3 className="max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">
                                        {featuredStory.title}
                                    </h3>

                                    {featuredStory.summary && (
                                        <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-white/80 sm:block">
                                            {featuredStory.summary}
                                        </p>
                                    )}

                                    <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
                                        <span>
                                            {featuredStory.source?.name ?? "Unknown source"}
                                        </span>

                                        <span>·</span>

                                        <span>6 min read</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </article>
                )}

                {/* Remaining Stories */}
                <div className="mt-4 divide-y rounded-2xl border bg-card">
                    {remainingStories.map((story) => (
                        <Link
                            key={story.id}
                            href={`/news/${story.id}`}
                            className="group flex gap-4 p-4 transition-colors hover:bg-muted/50"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    {story.category?.name ?? "News"}
                                </p>

                                <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:underline sm:text-lg">
                                    {story.title}
                                </h3>

                                {story.summary && (
                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                        {story.summary}
                                    </p>
                                )}

                                <p className="mt-2 text-xs text-muted-foreground">
                                    {story.source?.name ?? "Unknown source"} · 5 min read
                                </p>
                            </div>

                            {story.imageUrl && (
                                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
                                    <Image
                                        src={story.imageUrl}
                                        alt={story.title}
                                        fill
                                        sizes="160px"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
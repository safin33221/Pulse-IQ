
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Category } from "@/types/news/new.service.type";
import type { NewsArticle } from "@/types/news/news.types";
import type { IUser } from "@/types/user/user.type";

import { Bookmark, LoaderCircle, Share2 } from "lucide-react";

interface FeedProps {
    news: NewsArticle[];
    categories: Category[];
    activeCategory?: string;
    user: IUser | null;
}

const PAGE_SIZE = 20;

async function getClientNewsFeed(params: {
    category: string;
    page: number;
    limit: number;
}) {
    const query = new URLSearchParams({
        category: params.category,
        page: String(params.page),
        limit: String(params.limit),
    });

    const response = await fetch(`/api/news/feed?${query.toString()}`, {
        credentials: "include",
    });

    if (!response.ok) {
        const error = new Error("Failed to load the news feed");
        (error as Error & { status?: number }).status = response.status;
        throw error;
    }

    return response.json();
}

function getDailyFeaturedIndex(stories: NewsArticle[]): number {
    if (stories.length === 0) return 0;

    const seed = `${new Date().toDateString()}:${stories
        .map((story) => story.id)
        .join(":")}`;

    let hash = 0;

    for (const character of seed) {
        hash = (hash * 31 + character.charCodeAt(0)) | 0;
    }

    return Math.abs(hash) % stories.length;
}

export function Feed(props: FeedProps) {
    const activeCategory = props.activeCategory ?? "foryou";
    const feedKey = `${activeCategory}:${props.news
        .map((story) => story.id)
        .join(":")}`;

    return (
        <FeedContent
            key={feedKey}
            {...props}
            activeCategory={activeCategory}
        />
    );
}

function FeedContent({
    news: initialNews,
    categories,
    activeCategory = "foryou",
    user,
}: FeedProps) {
    /**
     * Initial 20 stories come from the Server Component.
     */
    const [news, setNews] = useState<NewsArticle[]>(initialNews);
    const isLoadingRef = useRef(false);
    /**
     * Page 1 is already loaded by the server.
     */
    const [page, setPage] = useState(1);

    const [hasNextPage, setHasNextPage] = useState(
        initialNews.length === PAGE_SIZE,
    );

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null);

    /**
     * Sentinel observer.
     */
    const observerRef = useRef<IntersectionObserver | null>(null);

    /**
     * Load the next page.
     */
    const loadNextPage = useCallback(async () => {
        if (isLoadingRef.current || !hasNextPage) {
            return;
        }

        isLoadingRef.current = true;

        const nextPage = page + 1;

        try {
            setIsLoading(true);
            setError(null);

            const response = await getClientNewsFeed({
                category: activeCategory,
                page: nextPage,
                limit: PAGE_SIZE,
            });

            const nextNews = Array.isArray(response?.data?.data)
                ? response.data.data
                : [];

            setNews((currentNews) => {
                const existingIds = new Set(
                    currentNews.map((story) => story.id),
                );

                const uniqueNews = nextNews.filter(
                    (story: NewsArticle) => !existingIds.has(story.id),
                );

                return [...currentNews, ...uniqueNews];
            });

            setPage(nextPage);

            setHasNextPage(nextNews.length === PAGE_SIZE);
        } catch (error) {
            console.error(
                "Failed to load next feed page:",
                error,
            );

            // A missing API route must not leave the sentinel active. Since
            // it remains in view, every observer refresh would otherwise
            // issue another failing request.
            if (
                error instanceof Error &&
                (error as Error & { status?: number }).status === 404
            ) {
                setHasNextPage(false);
            }

            setError("Failed to load more stories.");
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [
        activeCategory,
        hasNextPage,
        page,
    ]);

    /**
     * IntersectionObserver callback.
     *
     * The sentinel is placed below the feed.
     * When it comes within 500px of the viewport,
     * the next page starts loading.
     */
    const loadMoreRef = useCallback(
        (node: HTMLDivElement | null) => {
            /**
             * Remove previous observer.
             */
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }

            if (!node || isLoading || !hasNextPage) {
                return;
            }

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];

                    if (!entry?.isIntersecting) {
                        return;
                    }

                    if (isLoading || !hasNextPage) {
                        return;
                    }

                    void loadNextPage();
                },
                {
                    /**
                     * Start fetching before the user reaches
                     * the actual bottom of the feed.
                     */
                    // Fetch well before the reader reaches the end so the
                    // network request can finish during normal scrolling.
                    rootMargin: "1600px 0px",
                    threshold: 0,
                },
            );

            observerRef.current.observe(node);
        },
        [
            hasNextPage,
            isLoading,
            loadNextPage,
        ],
    );

    /**
     * Cleanup observer when component unmounts.
     */
    useEffect(() => {
        return () => {
            observerRef.current?.disconnect();
        };
    }, []);

    const currentTime = new Date();

    const storiesWithImages = news.filter(
        (story) => Boolean(story.imageUrl),
    );

    const featuredStory =
        storiesWithImages[
        getDailyFeaturedIndex(storiesWithImages)
        ] ?? news[0];

    const remainingStories = featuredStory
        ? news.filter((story) => story.id !== featuredStory.id)
        : [];

    const greeting =
        currentTime.getHours() < 12
            ? "Good morning"
            : currentTime.getHours() < 18
                ? "Good afternoon"
                : "Good evening";

    const userName = user?.username;

    const formattedDate = new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
    }).format(currentTime);

    const topics = [
        {
            value: "foryou",
            label: "For you",
        },
        ...categories.map((category) => ({
            value: category.slug,
            label: category.name,
        })),
    ];

    function formatRelativeTime(
        publishedAt: string | null,
    ): string {
        if (!publishedAt) return "Recently";

        const publishedDate = new Date(publishedAt);

        if (Number.isNaN(publishedDate.getTime())) {
            return "Recently";
        }

        const diffMs =
            currentTime.getTime() -
            publishedDate.getTime();

        const diffMinutes = Math.max(
            0,
            Math.floor(diffMs / (1000 * 60)),
        );

        if (diffMinutes < 1) return "just now";
        if (diffMinutes < 60) {
            return `${diffMinutes}m ago`;
        }

        const diffHours = Math.floor(
            diffMinutes / 60,
        );

        if (diffHours < 24) {
            return `${diffHours}h ago`;
        }

        const diffDays = Math.floor(
            diffHours / 24,
        );

        if (diffDays < 7) {
            return `${diffDays}d ago`;
        }

        return publishedDate.toLocaleDateString(
            undefined,
            {
                month: "short",
                day: "numeric",
            },
        );
    }

    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-base">
                    {formattedDate}
                </p>

                <h1 className="text-2xl font-bold tracking-tight sm:text-5xl">
                    {greeting}
                    {userName ? `, ${userName}` : ""}
                </h1>

                <p className="mt-3 text-base text-muted-foreground sm:text-xl">
                    {news.length}{" "}
                    {news.length === 1
                        ? "story"
                        : "stories"}{" "}
                    in your feed
                </p>
            </div>

            {/* Topics */}
            <div className="sticky top-14 z-50 mb-8 bg-background/95 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                <div className="overflow-x-auto scrollbar-none">
                    <div className="flex w-max gap-2">
                        {topics.map((topic) => {
                            const active =
                                activeCategory ===
                                topic.value;

                            return (
                                <Button
                                    key={topic.value}
                                    asChild
                                    variant={
                                        active
                                            ? "default"
                                            : "outline"
                                    }
                                    className={
                                        active
                                            ? "rounded-full px-5"
                                            : "rounded-full bg-background px-5"
                                    }
                                >
                                    <Link
                                        href={
                                            topic.value ===
                                                "foryou"
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
            </div>

            {/* Top News */}
            <div>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Top Stories
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        {activeCategory ===
                            "foryou"
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
                            There are no stories
                            available for this
                            category yet.
                        </p>
                    </div>
                )}

                {/* Featured Story */}
                {featuredStory && (
                    <article className="group overflow-hidden rounded-2xl border bg-card">
                        <Link
                            href={`/feed/${featuredStory.id}`}
                            className="block"
                        >
                            <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
                                {featuredStory.imageUrl ? (
                                    <Image
                                        src={
                                            featuredStory.imageUrl
                                        }
                                        alt={
                                            featuredStory.title
                                        }
                                        fill
                                        priority
                                        sizes="(max-width: 768px) 100vw, 70vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-muted" />
                                )}

                                <Badge className="absolute left-3 top-3 rounded-full border-0 bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground sm:left-4 sm:top-4 sm:px-4 sm:py-1.5 sm:text-xs">
                                    <span className="mr-1">
                                        ●
                                    </span>
                                    Featured
                                </Badge>
                            </div>

                            <div className="px-4 py-4 sm:px-5 sm:py-5">
                                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs">
                                    {featuredStory
                                        .category
                                        ?.name ??
                                        "News"}
                                </p>

                                <h3 className="max-w-4xl text-xl font-bold leading-tight tracking-tight sm:text-2xl lg:text-[28px]">
                                    {
                                        featuredStory.title
                                    }
                                </h3>

                                {featuredStory.summary && (
                                    <p className="mt-2 max-w-3xl text-sm leading-5 text-muted-foreground sm:text-[15px] sm:leading-6">
                                        {
                                            featuredStory.summary
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between border-t px-4 py-3 sm:px-5">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                                    <span className="font-medium text-foreground">
                                        {featuredStory
                                            .source
                                            ?.name ??
                                            "Unknown source"}
                                    </span>

                                    <span>·</span>

                                    <span>
                                        {formatRelativeTime(
                                            featuredStory.publishedAt,
                                        )}
                                    </span>

                                    <span>·</span>

                                    <span>
                                        6 min read
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 text-muted-foreground">
                                    <button
                                        type="button"
                                        aria-label="Share story"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }}
                                        className="transition-colors hover:text-foreground"
                                    >
                                        <Share2 className="size-4" />
                                    </button>

                                    <button
                                        type="button"
                                        aria-label="Save story"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }}
                                        className="transition-colors hover:text-foreground"
                                    >
                                        <Bookmark className="size-4" />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </article>
                )}

                {/* Remaining Stories */}
                <div className="mt-4 divide-y rounded-2xl border bg-card">
                    {remainingStories.map(
                        (story) => (
                            <Link
                                key={story.id}
                                href={`/feed/${story.id}`}
                                className="group flex gap-4 p-4 transition-colors hover:bg-muted/50"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                        {story.category
                                            ?.name ??
                                            "News"}
                                    </p>

                                    <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:underline sm:text-lg">
                                        {
                                            story.title
                                        }
                                    </h3>

                                    {story.summary && (
                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {
                                                story.summary
                                            }
                                        </p>
                                    )}

                                    <p className="mt-2 text-xs text-muted-foreground">
                                        {story
                                            .source
                                            ?.name ??
                                            "Unknown source"}{" "}
                                        · 5 min read
                                    </p>
                                </div>

                                {story.imageUrl && (
                                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-40">
                                        <Image
                                            src={
                                                story.imageUrl
                                            }
                                            alt={
                                                story.title
                                            }
                                            fill
                                            sizes="160px"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                            </Link>
                        ),
                    )}
                </div>

                {/* Infinite Scroll Sentinel */}
                {hasNextPage && (
                    <div
                        ref={loadMoreRef}
                        className="h-10 w-full"
                        aria-hidden="true"
                    />
                )}

                {/* Loading */}
                {isLoading && (
                    <div
                        className="flex items-center justify-center gap-2 py-3 text-xs text-muted-foreground"
                        role="status"
                        aria-live="polite"
                    >
                        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        <span>Loading more stories</span>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="py-6 text-center">
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    </div>
                )}

                {/* End of Feed */}
                {!hasNextPage &&
                    news.length > 0 && (
                        <p className="py-8 text-center text-sm text-muted-foreground">
                            You&apos;ve reached the
                            end of your feed.
                        </p>
                    )}
            </div>
        </section>
    );
}


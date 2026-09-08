import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/types/news/news.types";

interface NewsDetailsProps {
    news: NewsArticle;
}

export function NewsDetails({ news }: NewsDetailsProps) {
    const articleContent = removeInlineImages(news.content);

    return (
        <main className="bg-background">
            <article className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
                <Link href="/feed" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                    ← Back to feed
                </Link>

                <header className="mt-8 border-b pb-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <span>{news.category.name}</span>
                        <span aria-hidden>·</span>
                        <span>{formatPublishedDate(news.publishedAt)}</span>
                    </div>

                    <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                        {news.title}
                    </h1>

                    {news.summary && (
                        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-xl">
                            {news.summary}
                        </p>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-medium">{news.source.name}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Published {formatTimeAgo(news.publishedAt)}
                            </p>
                        </div>

                        <Button asChild variant="outline" size="sm">
                            <a href={news.sourceUrl} target="_blank" rel="noreferrer">
                                Read original <ExternalLink className="size-3.5" />
                            </a>
                        </Button>
                    </div>
                </header>

                {news.imageUrl && (
                    <div className="relative mt-7 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">

                        <Image src={news.imageUrl} alt={news.title} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />

                    </div>
                )}


                {articleContent ? (
                    <div
                        className="prose prose-neutral mt-8 max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: articleContent }}
                    />
                ) : news.summary ? (
                    <p className="mt-8 text-base leading-8 text-muted-foreground">{news.summary}</p>
                ) : null}

                <footer className="mt-10 border-t pt-6">
                    <Button asChild variant="outline">
                        <a href={news.sourceUrl} target="_blank" rel="noreferrer">
                            View full story at {news.source.name} <ExternalLink className="size-4" />
                        </a>
                    </Button>
                </footer>
            </article>
        </main>
    );
}

function removeInlineImages(content: string | null): string | null {
    if (!content) return null;

    return content
        .replace(/<figure\b[^>]*>[\s\S]*?<\/figure>/gi, "")
        .replace(/<img\b[^>]*>/gi, "")
        .trim();
}

function formatPublishedDate(value: string | null): string {
    if (!value) return "Recently";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Recently";

    return new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", year: "numeric" }).format(date);
}

function formatTimeAgo(value: string | null): string {
    if (!value) return "recently";

    const date = new Date(value);
    const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60_000));
    if (minutes < 60) return minutes < 1 ? "just now" : `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    return hours < 24 ? `${hours}h ago` : `${Math.floor(hours / 24)}d ago`;
}

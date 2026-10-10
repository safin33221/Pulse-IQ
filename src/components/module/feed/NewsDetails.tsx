import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NewsArticle } from "@/types/news/news.types";

interface NewsDetailsProps {
    news: NewsArticle;
}

export function NewsDetails({ news }: NewsDetailsProps) {
    const paragraphs = getArticleParagraphs(news.content);
    const readingMinutes = Math.max(1, Math.ceil(paragraphs.join(" ").split(/\s+/).length / 220));

    return (
        <main className="min-h-screen bg-background">
            <article className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-8 sm:py-10">
                <Link
                    href="/feed"
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Back to feed
                </Link>

                <header className="mx-auto mt-10 max-w-4xl sm:mt-14">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        <span>{news.category.name}</span>
                        <span aria-hidden="true" className="size-1 rounded-full bg-primary/50" />
                        <time dateTime={news.publishedAt ?? undefined} className="text-muted-foreground">
                            {formatPublishedDate(news.publishedAt)}
                        </time>
                    </div>

                    <h1 className="mt-5 text-balance text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl sm:leading-[1.08] lg:text-6xl">
                        {news.title}
                    </h1>

                    {news.summary && (
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
                            {news.summary}
                        </p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y py-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                                {news.source.name.slice(0, 1).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold">{news.source.name}</p>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    Published {formatTimeAgo(news.publishedAt)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock3 className="size-4" aria-hidden="true" />
                            <span>{readingMinutes} min read</span>
                        </div>
                    </div>
                </header>

                {news.imageUrl && (
                    <figure className="mt-8 overflow-hidden rounded-2xl bg-muted sm:mt-10">
                        <div className="relative aspect-[16/9]">
                            <Image
                                src={news.imageUrl}
                                alt={news.title}
                                fill
                                priority
                                sizes="(max-width: 896px) 100vw, 896px"
                                className="object-cover"
                            />
                        </div>
                    </figure>
                )}

                <div className="mx-auto mt-9 max-w-3xl sm:mt-12">
                    {paragraphs.length > 0 ? (
                        <div className="space-y-6 text-base leading-8 text-foreground/90 sm:text-lg sm:leading-9">
                            {paragraphs.map((paragraph, index) => (
                                <p key={`${index}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border bg-card p-6 sm:p-8">
                            <p className="text-muted-foreground">
                                The full article text is not available yet. Read the complete story at the original source.
                            </p>
                            {news.summary && <p className="mt-4 leading-8">{news.summary}</p>}
                        </div>
                    )}
                </div>

                <footer className="mx-auto mt-12 flex max-w-3xl flex-col gap-4 border-t pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Originally published by <span className="font-medium text-foreground">{news.source.name}</span>
                    </p>
                    <Button asChild>
                        <a href={news.sourceUrl} target="_blank" rel="noopener noreferrer">
                            Read at source <ArrowUpRight className="size-4" />
                        </a>
                    </Button>
                </footer>
            </article>
        </main>
    );
}

function getArticleParagraphs(content: string | null): string[] {
    if (!content) return [];

    // RSS entries may contain HTML; render extracted text as React text, never as raw HTML.
    return content
        .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ")
        .replace(/<(br|\/p|\/div|\/h[1-6]|\/li|\/blockquote)\b[^>]*>/gi, "\n\n")
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;|&#160;/gi, " ")
        .replace(/&amp;/gi, "&")
        .replace(/&quot;/gi, '"')
        .replace(/&#39;|&apos;/gi, "'")
        .replace(/&lt;/gi, "<")
        .replace(/&gt;/gi, ">")
        .replace(/&#(\d+);/g, (_, code: string) => String.fromCodePoint(Number(code)))
        .replace(/&#x([\da-f]+);/gi, (_, code: string) => String.fromCodePoint(parseInt(code, 16)))
        .split(/\n+/)
        .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
        .filter(Boolean);
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

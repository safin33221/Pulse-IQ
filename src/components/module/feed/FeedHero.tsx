import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const topics = [
    "For you",
    "Technology",
    "Business",
    "Science",
    "Climate",
    "Politics",
    "Health",
    "Culture",
    "Sports",
];

export function FeedHero() {
    return (
        <section className="w-full">
            {/* Header */}
            <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.12em] text-muted-foreground sm:text-base">
                    Sunday, August 30
                </p>

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                    Good afternoon, Ana
                </h1>

                <p className="mt-3 text-base text-muted-foreground sm:text-xl">
                    15 stories across your topics · about a 12 minute read
                </p>
            </div>

            {/* Topics */}
            <div className="mb-8 overflow-x-auto scrollbar-none">
                <div className="flex w-max gap-2">
                    {topics.map((topic, index) => (
                        <Button
                            key={topic}
                            type="button"
                            variant={index === 0 ? "default" : "outline"}
                            className={
                                index === 0
                                    ? "rounded-full px-5"
                                    : "rounded-full bg-background px-5"
                            }
                        >
                            {topic}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Top Stories */}
            <div>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Top Stories
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                        Ranked for you in the last 24 hours
                    </p>
                </div>

                {/* Featured Story */}
                <article className="group relative overflow-hidden rounded-2xl border bg-card">
                    <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
                        <Image
                            src="/images/news/ai-compute.jpg"
                            alt="AI compute infrastructure"
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 70vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Breaking */}
                        <Badge
                            className="absolute left-4 top-4 rounded-full border-0 bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary-foreground"
                        >
                            ● Breaking
                        </Badge>

                        {/* Story Content */}
                        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-white/70">
                                Technology · 34 min ago
                            </p>

                            <h3 className="max-w-3xl text-2xl font-bold leading-tight sm:text-4xl">
                                Nations agree on first shared rules for
                                frontier AI compute
                            </h3>

                            <p className="mt-3 hidden max-w-2xl text-sm leading-6 text-white/80 sm:block">
                                Governments and technology leaders announce
                                a new framework for responsible frontier AI
                                development and compute infrastructure.
                            </p>

                            <div className="mt-4 flex items-center gap-3 text-sm text-white/70">
                                <span>Meridian Post</span>
                                <span>·</span>
                                <span>6 min read</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
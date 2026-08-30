import { TrendingUp } from "lucide-react";

type TrendingStory = {
    rank: number;
    title: string;
    source: string;
    publishedAt: string;
    readTime: string;
};

const trendingStories: TrendingStory[] = [
    {
        rank: 1,
        title: "Nations agree on first shared rules for frontier AI compute",
        source: "Meridian Post",
        publishedAt: "34m ago",
        readTime: "6 min read",
    },
    {
        rank: 2,
        title: "Central bank holds rates but signals a slower path down",
        source: "The Ledger",
        publishedAt: "2h ago",
        readTime: "4 min read",
    },
    {
        rank: 3,
        title: "Survey finds three major glaciers past the point of stable retreat",
        source: "Atlas Wire",
        publishedAt: "3h ago",
        readTime: "7 min read",
    },
];

export function TrendingStories() {
    return (
        <section className="rounded-2xl border bg-card p-5 sm:p-6">
            {/* Header */}
            <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />

                <h2 className="text-lg font-semibold">
                    Trending now
                </h2>
            </div>

            {/* Stories */}
            <div>
                {trendingStories.map((story, index) => (
                    <article
                        key={story.rank}
                        className={[
                            "py-4",
                            index !== 0 && "border-t",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
                        <div className="flex gap-4">
                            {/* Rank */}
                            <span className="shrink-0 pt-0.5 text-xl font-medium text-muted-foreground">
                                {String(story.rank).padStart(2, "0")}
                            </span>

                            {/* Content */}
                            <div className="min-w-0">
                                <h3
                                    className={[
                                        "text-base font-semibold leading-snug",
                                        "transition-colors hover:text-primary",
                                        story.rank === 1 &&
                                            "text-primary",
                                    ]
                                        .filter(Boolean)
                                        .join(" ")}
                                >
                                    <a href="#">
                                        {story.title}
                                    </a>
                                </h3>

                                <div className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                                    <span>{story.source}</span>
                                    <span>·</span>
                                    <span>{story.publishedAt}</span>
                                    <span>·</span>
                                    <span>{story.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
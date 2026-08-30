import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Topic = {
    name: string;
    storyCount: number;
};

const topics: Topic[] = [
    {
        name: "AI Regulation",
        storyCount: 214,
    },
    {
        name: "Central Banks",
        storyCount: 168,
    },
    {
        name: "Grid Storage",
        storyCount: 96,
    },
];

export function YourTopics() {
    return (
        <section className="rounded-2xl border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Your topics
                </h2>
            </div>

            <div className="space-y-1">
                {topics.map((topic) => (
                    <Link
                        key={topic.name}
                        href={`/topics/${encodeURIComponent(topic.name)}`}
                        className="group flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-muted"
                    >
                        <span className="text-sm font-medium">
                            {topic.name}
                        </span>

                        <span className="text-sm text-muted-foreground transition-colors group-hover:text-primary">
                            {topic.storyCount} stories
                        </span>
                    </Link>
                ))}
            </div>

            <Link
                href="/topics"
                className="mt-4 inline-flex items-center gap-1 px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Manage topics

                <ChevronRight className="size-4" />
            </Link>
        </section>
    );
}
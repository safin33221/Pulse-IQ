import { FeedHero } from "@/components/module/feed/FeedHero";
import { TrendingStories } from "@/components/module/feed/TrendingStories";
import { YourTopics } from "@/components/module/feed/YourTopics";
import { getNewsFeed } from "@/services/news/getNewsFeed";

interface FeedPageProps {
    searchParams: Promise<{
        category?: string;
    }>;
}

export default async function Page({
    searchParams,
}: FeedPageProps) {
    const params = await searchParams;

    const category = params.category ?? "foryou";

    const feedResponse = await getNewsFeed({
        category,
        page: 1,
        limit: 20,
    });

    const feedNews = Array.isArray(feedResponse?.data?.data)
        ? feedResponse.data.data
        : [];

    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
                <FeedHero
                    news={feedNews}
                    activeCategory={category}
                />

                <aside className="hidden space-y-6 lg:block">
                    <TrendingStories />

                    <YourTopics />
                </aside>
            </div>
        </div>
    );
}

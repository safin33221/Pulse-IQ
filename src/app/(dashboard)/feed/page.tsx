import { Feed } from "@/components/module/feed/Feed";
import { TrendingStories } from "@/components/module/feed/TrendingStories";
import { YourTopics } from "@/components/module/feed/YourTopics";
import { getMe } from "@/services/auth/getMe";
import { getCategories } from "@/services/news/category";

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

    const [feedResponse, categoryResponse, user] = await Promise.all([
        getNewsFeed({
            category,
            page: 1,
            limit: 20,
        }),
        getCategories(),
        getMe()
    ]);

    const feedNews = Array.isArray(feedResponse?.data?.data)
        ? feedResponse.data.data
        : [];

    const categories = Array.isArray(categoryResponse?.data)
        ? categoryResponse.data
        : [];

    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
                <Feed
                    news={feedNews}
                    categories={categories}
                    activeCategory={category}
                    user={user}
                />

                <aside className="sticky top-20 hidden max-h-[calc(100dvh-6rem)] self-start space-y-6 overflow-y-auto overscroll-contain pr-1 lg:block">
                    <TrendingStories />

                    <YourTopics />
                </aside>
            </div>
        </div>
    );
}
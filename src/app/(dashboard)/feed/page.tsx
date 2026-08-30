import { FeedHero } from "@/components/module/feed/FeedHero";
import { TrendingStories } from "@/components/module/feed/TrendingStories";
import { YourTopics } from "@/components/module/feed/YourTopics";

export default function page() {
    return (
        <div className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-14">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
                <FeedHero />

                <aside className="hidden lg:block space-y-6 ">
                    <TrendingStories />

                    <YourTopics />
                </aside>
            </div>
        </div>
    );
};

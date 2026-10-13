import { serverFetch } from "@/lib/api/server-fetch";
import type { NewsFeedResponse } from "@/types/news/new.service.type";
import type { NewsArticle } from "@/types/news/news.types";

const LATEST_STORIES_LIMIT = 3;

export async function getLatestStories(): Promise<NewsArticle[]> {
    const searchParams = new URLSearchParams({
        page: "1",
        limit: String(LATEST_STORIES_LIMIT),
    });

    const response = await serverFetch.get(
        `/news/latest?${searchParams.toString()}`,
        { cache: "no-store" },
    );

    const result = (await response.json()) as NewsFeedResponse;

    if (!response.ok) {
        throw new Error(result.message ?? "Failed to fetch latest stories");
    }

    return Array.isArray(result.data?.data) ? result.data.data : [];
}

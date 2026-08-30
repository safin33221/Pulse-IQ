import { serverFetch } from "@/lib/api/server-fetch";
import {
    NewsDetailsResponse,
} from "@/types/news/new.service.type";

export async function getNewsBySlug(
    slug: string,
): Promise<NewsDetailsResponse> {
    const res = await serverFetch.get(
        `/news/${encodeURIComponent(slug)}`,
    );

    const result = (await res.json()) as NewsDetailsResponse;

    if (!res.ok) {
        throw new Error(
            result.message ?? "Failed to fetch news article",
        );
    }

    return result;
}

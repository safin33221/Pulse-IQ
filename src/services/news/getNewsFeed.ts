import { serverFetch } from "@/lib/api/server-fetch";
import {
  GetNewsFeedParams,
  NewsFeedResponse,
} from "@/types/news/new.service.type";

export async function getNewsFeed(
  params: GetNewsFeedParams = {},
): Promise<NewsFeedResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("category", params.category ?? "foryou");

  searchParams.set("page", String(params.page ?? 1));

  searchParams.set("limit", String(params.limit ?? 20));

  const res = await serverFetch.get(`/news/feed?${searchParams.toString()}`);

  const result = (await res.json()) as NewsFeedResponse;

  if (!res.ok) {
    throw new Error(result.message ?? "Failed to fetch news feed");
  }

  return result;
}

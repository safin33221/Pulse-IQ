import { serverFetch } from "@/lib/api/server-fetch";
import { CategoriesResponse } from "@/types/news/new.service.type";

export async function getCategories(): Promise<CategoriesResponse> {
  const res = await serverFetch.get("/categories");

  const result = (await res.json()) as CategoriesResponse;

  if (!res.ok) {
    throw new Error(result.message ?? "Failed to fetch categories");
  }

  return result;
}

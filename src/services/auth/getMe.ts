import { serverFetch } from "@/lib/api/server-fetch";
import { CurrentUser, GetMeResponse } from "@/types/auth/auth.type";

export async function getMe(): Promise<CurrentUser | null> {
  try {
    const response = await serverFetch.get("/auth/me");

    if (!response.ok) {
      return null;
    }

    const result = (await response.json()) as GetMeResponse;

    if (!result.success || !result.data) {
      return null;
    }

    return result.data;
  } catch {
    return null;
  }
}

import { serverFetch } from "@/lib/api/server-fetch";
import { GetMeResponse } from "@/types/auth/auth.type";
import { IUser } from "@/types/user/user.type";

export async function getMe(): Promise<IUser | null> {
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

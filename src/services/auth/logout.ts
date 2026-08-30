"use server";

import { redirect } from "next/navigation";

import { deleteCookies } from "@/lib/auth/tokenHandler";
import { serverFetch } from "@/lib/api/server-fetch";

export async function logout(): Promise<void> {
    try {
        await serverFetch.post("/auth/logout");
    } finally {
        await Promise.all([
            deleteCookies("access_token"),
            deleteCookies("refresh_token"),
        ]);
    }

    redirect("/");
}

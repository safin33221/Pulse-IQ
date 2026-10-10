import { NextRequest, NextResponse } from "next/server";

import { serverFetch } from "@/lib/api/server-fetch";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.toString();
    const response = await serverFetch.get(
        `/news/feed${query ? `?${query}` : ""}`,
        { cache: "no-store" },
    );

    const body = await response.json();

    return NextResponse.json(body, { status: response.status });
}

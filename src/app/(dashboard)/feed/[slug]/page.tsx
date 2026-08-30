import { notFound } from "next/navigation";

import { getNewsBySlug } from "@/services/news/getNewsBySlug";
import { NewsDetails } from "@/components/module/feed/NewsDetails";

interface NewsDetailsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({
    params,
}: NewsDetailsPageProps) {
    const { slug } = await params;

    let response;

    try {
        response = await getNewsBySlug(slug);
    } catch {
        notFound();
    }

    if (!response?.data) {
        notFound();
    }

    return <NewsDetails news={response.data} />;
}

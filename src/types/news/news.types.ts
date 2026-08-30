export interface NewsArticle {
  id: string;
  title: string;
  summary: string | null;
  content: string | null;
  sourceUrl: string;
  imageUrl: string | null;
  publishedAt: string | null;

  category: {
    id: string;
    name: string;
    slug: string;
  };

  source: {
    id: string;
    name: string;
    slug: string;
  };
}

export type NewsCategory =
  | "foryou"
  | "technology"
  | "business"
  | "politics"
  | string;

export interface NewsQuery {
  category?: NewsCategory;
  page?: number;
  limit?: number;
  source?: string;
}

export interface NewsCategoryData {
  id: string;
  name: string;
  slug: string;
}

export interface NewsSourceData {
  id: string;
  name: string;
  slug: string;
}

export interface NewsTopicData {
  id: string;
  name: string;
  slug: string;
}

export interface NewsTopicRelation {
  topicId: string;
  topic: NewsTopicData;
}

export interface NewsItem {
  id: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  sourceUrl: string;
  imageUrl?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  category: NewsCategoryData;
  source: NewsSourceData;
  topics: NewsTopicRelation[];
}

export interface NewsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

import { NewsArticle, NewsItem, NewsMeta } from "./news.types";


export interface NewsResponse {
  success?: boolean;
  message?: string;
  data: NewsItem[];
  meta: NewsMeta;
}



export interface NewsFeedResponse {
  success: boolean;
  message?: string;
  data: {
    data: NewsArticle[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface GetNewsFeedParams {
  category?: string;
  page?: number;
  limit?: number;
}

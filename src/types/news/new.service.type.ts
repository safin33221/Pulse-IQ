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


export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CategoriesResponse {
  success: boolean;
  statusCode: number;
  data: Category[];
  message?: string;
}

export interface NewsDetailsResponse {
  success: boolean;
  message?: string;
  data: NewsArticle;
}

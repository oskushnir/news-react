export interface NewsItem {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  video_url?: string | null;
  description?: string | null;
  content?: string | null;
  pubDate: string;
  image_url?: string | null;
  source_id: string;
  category?: string[];
  country?: string[];
  language?: string;
}

export interface NewsAPIResponseOk {
  status: "success";
  totalResults: number;
  results: NewsItem[];
  nextPage?: string;
}

export interface NewsAPIResponseErr {
  status: "error";
  code: string;
  message: string;
}

export type NewsAPIResponse = NewsAPIResponseOk | NewsAPIResponseErr;

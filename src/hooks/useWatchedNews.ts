import { useState, useEffect, useCallback } from "react";
import type { NewsItem } from "../types/News";

const WATCHED_NEWS_KEY = "watched-news";

export const useWatchedNews = () => {
  const [watchedNews, setWatchedNews] = useState<Set<string>>(new Set());

  // Load watched news from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(WATCHED_NEWS_KEY);
    if (stored) {
      try {
        const watchedArray = JSON.parse(stored);
        setWatchedNews(new Set(watchedArray));
      } catch (error) {
        console.error("Error loading watched news from localStorage:", error);
      }
    }
  }, []);

  // Save to localStorage whenever watchedNews changes
  useEffect(() => {
    localStorage.setItem(
      WATCHED_NEWS_KEY,
      JSON.stringify(Array.from(watchedNews))
    );
  }, [watchedNews]);

  const toggleWatch = useCallback((articleId: string) => {
    setWatchedNews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  }, []);

  const isWatched = useCallback(
    (articleId: string) => {
      return watchedNews.has(articleId);
    },
    [watchedNews]
  );

  const getWatchedArticles = useCallback(
    (allArticles: NewsItem[]) => {
      return allArticles.filter((article) =>
        watchedNews.has(article.article_id)
      );
    },
    [watchedNews]
  );

  const clearWatched = useCallback(() => {
    setWatchedNews(new Set());
  }, []);

  return {
    watchedNews,
    toggleWatch,
    isWatched,
    getWatchedArticles,
    clearWatched,
  };
};

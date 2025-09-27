import type React from "react";
import type { NewsItem } from "../types/News";
import { Button } from "./ui/button";
import { X, ExternalLink, Calendar, User, Tag, Globe } from "lucide-react";

type Props = {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export const NewsDetailsModal: React.FC<Props> = ({ news, isOpen, onClose }) => {
  if (!isOpen || !news) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">News Details</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-160px)]">
          {news.image_url && (
            <div className="w-full h-64 md:h-80">
              <img
                src={news.image_url}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {news.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Published: {formatDate(news.pubDate)}</span>
              </div>

              {news.creator && news.creator.length > 0 && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>By: {news.creator.join(", ")}</span>
                </div>
              )}

              {news.language && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Language: {news.language.toUpperCase()}</span>
                </div>
              )}

              {news.source_id && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <span>Source: {news.source_id}</span>
                </div>
              )}
            </div>

            {(news.category && news.category.length > 0) || (news.country && news.country.length > 0) ? (
              <div className="space-y-3">
                {news.category && news.category.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories:</h3>
                    <div className="flex flex-wrap gap-2">
                      {news.category.map((cat, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {news.country && news.country.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Countries:</h3>
                    <div className="flex flex-wrap gap-2">
                      {news.country.map((country, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {news.keywords && news.keywords.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                  {news.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {news.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{news.description}</p>
              </div>
            )}

            {news.content && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Content</h3>
                <div className="text-gray-700 leading-relaxed prose max-w-none">
                  {news.content}
                </div>
              </div>
            )}

            {news.video_url && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Video</h3>
                <div className="aspect-video">
                  <video
                    src={news.video_url}
                    controls
                    className="w-full h-full rounded-lg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Article ID: {news.article_id}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onClose}
              variant="outline"
            >
              Close
            </Button>
            <Button
              onClick={() => window.open(news.link, '_blank', 'noopener,noreferrer')}
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Read Full Article
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

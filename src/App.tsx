import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "./api/news";
import { Search } from "./components/Search";
import { useCallback, useState } from "react";
import { Spinner } from "./components/Spinner";
import type { NewsItem } from "./types/News";
import { Selector } from "./components/Selector";
import { categories } from "./utils/categories";
import { countries } from "./utils/countries";
import debounce from "lodash.debounce";
import { ClearButton } from "./components/ClearButton";
import { NewsDetailsModal } from "./components/NewsDetailsModal";
import { Button } from "./components/ui/button";
import { Eye } from "lucide-react";

export function App() {
  const [category, setCategory] = useState<string | null>('');
  const [country, setCountry] = useState<string | null>('');
  const [query, setQuery] = useState<string>("");
  const [appliedFilterQuery, setAppliedFilterQuery] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["news", { category, country, q: appliedFilterQuery || null }],
    queryFn: () => getAllNews({ category, country, q: appliedFilterQuery || null }),
  });

  const articles: NewsItem[] = Array.isArray(data?.results) ? data.results : [];

  const applyQuery = useCallback(                              // eslint-disable-line react-hooks/exhaustive-deps
    debounce((q: string) => setAppliedFilterQuery(q), 500),
    []
  );

  const handleQueryChange = (q: string) => {
    setQuery(q);
    applyQuery(q);
  };

  const handleClearFilters = () => {
    setCategory('');
    setCountry('');
  }

  const handleQueryClear = () => {
    setQuery('');
    setAppliedFilterQuery('');
  }

  const handleViewDetails = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNews(null);
  }

  return (
    <div className="max-w-[1200px] mx-auto my-15">
      <h1 className="text-center font-bold text-5xl">World news</h1>

      <div className="flex flex-col justify-center my-10 gap-10">
        <Search placeholder={"Search news..."} query={query} setQuery={handleQueryChange} handleClear={handleQueryClear} />

        <div className="flex flex-col gap-5 justify-center items-center">
          <div className="flex justify-center gap-5 flex-wrap">
            <Selector
              label="Categories"
              placeholder="Select a category"
              value={category}
              arrayOfValues={categories}
              setValue={setCategory}
            />

            <Selector
              label="Countries"
              placeholder="Select a country"
              value={country}
              arrayOfValues={countries}
              setValue={setCountry}
            />
          </div>

          <ClearButton buttonLabel="Clear filters" variant="destructive" onClick={handleClearFilters} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isPending && !error &&
          <div className="col-span-full flex justify-center items-center mt-20">
            <Spinner size={25} />
          </div>
        }

        {error && !isPending && articles.length === 0 && (
          <div className="col-span-full flex justify-center items-center mt-20">
            <p className="text-red-500 text-center font-semibold text-2xl">
              Something went wrong... Try again later.
            </p>
          </div>
        )}

        {!isPending && !error && articles.length === 0 && (
          <div className="col-span-full flex justify-center items-center mt-20">
            <p className="text-gray-500 text-center font-semibold text-2xl">
              No news found.
            </p>
          </div>
        )}

        {articles.map((news: NewsItem) => (
          <div key={news.link} className="border rounded-lg overflow-hidden shadow-lg">
            {news.image_url && (
              <img src={news.image_url} alt={news.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2 line-clamp-3">{news.title}</h2>
              <p className="text-gray-700 text-base line-clamp-4">{news.description}</p>
              <div className="flex justify-between items-center mt-4">
                <a
                  href={news.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
                <Button
                  onClick={() => handleViewDetails(news)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <NewsDetailsModal
        news={selectedNews}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

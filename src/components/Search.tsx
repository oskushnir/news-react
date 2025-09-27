import type React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search as SearchIcon, X } from "lucide-react";

type Props = {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
  handleClear?: () => void;
};

export const Search: React.FC<Props> = ({ placeholder, query, setQuery, handleClear }) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="w-full relative">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />

      <Input
        placeholder={placeholder}
        value={query}
        onChange={handleQueryChange}
        type="text"
        className="pl-9 pr-9"
      />

      {handleClear && (
        <Button
          onClick={handleClear}
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 cursor-pointer"
          disabled={!query}
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      )}
    </div>
  );
};

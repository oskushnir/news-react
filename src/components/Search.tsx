import type React from "react";
import { Input } from "./ui/input";

type Props = {
  placeholder: string;
  query: string;
  setQuery: (query: string) => void;
}

export const Search: React.FC<Props> = ({ placeholder, query, setQuery }) => {
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Input
      className="w-full"
      placeholder={placeholder}
      value={query}
      onChange={handleQueryChange}
    />
  );
}
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useSearch } from "@/hooks/useSearch";
import { cn } from "@/lib/utils";
import { type HCP } from "@/types";

type SearchResult = HCP;

const SearchFilter = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { searchResults, isSearching, handleSearch } = useSearch();

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    if (inputValue.trim() && searchResults.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    navigate(`/researcher/${result.id}`);
    setIsDropdownOpen(false);
    if (inputRef.current) {
      inputRef.current.value = result.name;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim()) {
      setIsDropdownOpen(true);
      handleSearch(value);
    } else {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search researchers by name or ORCID..."
          className="w-full pl-10 pr-10 h-11 text-base"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          aria-label="Search researchers"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-gray-400" />
        )}
      </div>

      {isDropdownOpen && inputValue.trim() && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5",
            "max-h-60 overflow-auto focus:outline-none",
            "animate-in fade-in-0 zoom-in-95"
          )}
        >
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <button
                key={result.id}
                type="button"
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                onMouseDown={() => handleResultSelect(result)}
              >
                <div className="font-medium text-gray-900">{result.name}</div>
                <div className="text-xs text-gray-500">ORCID: {result.id}</div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              {isSearching ? "Searching..." : "No researchers found"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;

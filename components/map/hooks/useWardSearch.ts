import { useEffect, useState } from 'react';

export default function useWardSearch(
  wards: any,
) {
    const clearSearch = () => {
      setSearchText('');
      setSuggestions([]);
  };

  const [searchText, setSearchText] =
    useState('');

  const [suggestions, setSuggestions] =
    useState<any[]>([]);

  useEffect(() => {
    if (!wards || !searchText.trim()) {
      setSuggestions([]);
      return;
    }

    const keyword =
      searchText.toLowerCase();

    const results = wards.features
      .filter((feature: any) =>
        feature.properties.name
          ?.toLowerCase()
          .includes(keyword),
      )
      .slice(0, 10);

    setSuggestions(results);
  }, [searchText, wards]);

  return {
    searchText,
    setSearchText,
    suggestions,
    setSuggestions,
    clearSearch,
  };
}
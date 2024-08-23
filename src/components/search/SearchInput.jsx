// src/components/search/SearchInput.jsx

import React, { useState, useEffect } from 'react';

// Debounce function to avoid sending too many requests
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout when value or delay changes.
    // Ensures that the previous timeout is cleared if the value or delay changes
    // before the timeout completes
    return () => {
      clearTimeout(handler); // P.S. The 'clearTimeout'function is a built-in function in JavaScript
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // Debouncing search input by 500ms

  useEffect(() => {
    // 'debouncedQuery.trim' - when the user types a search term, the method will remove spaces.
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
    } else {
      onSearch(''); // If input is empty, trigger empty search
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div className="mb-4">
      <label htmlFor="search" className="sr-only">
        Search Listings
      </label>
      <input
        type="text"
        id="search"
        className="border border-gray-300 rounded-md p-2 w-full"
        placeholder="Search listings..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search Listings"
      />
    </div>
  );
}

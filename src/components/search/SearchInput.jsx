// src/components/search/SearchInput.jsx

import React, { useState } from 'react';

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (query.trim()) {
      onSearch(query.trim()); // Trigger search with the query
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
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
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
}

// src/components/search/SearchInput.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  // Synchronize the input value with the context's search term
  // useEffect(() => {
  //   setQuery(searchTerm);
  //   // console.log('query1===', query);
  // }, [searchTerm]);

  // Clear input when navigating to the home page
  useEffect(() => {
    if (!location.search) {
      setQuery('');
      console.log('query2===', query);
      // console.log('location.pathname+++===', location.search);
    }
  }, [location]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (query.trim()) {
      // setSearchTerm(query.trim()); // Update the search term in the context
      setSearchParams({ search: query.trim() }); // Update the URL with the search term
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

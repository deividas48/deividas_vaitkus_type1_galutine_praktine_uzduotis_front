// src/components/search/SearchInput.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HOME_PAGE_PATH, CATEGORIES_PAGE_PATH } from '../../config/routes';
import '../../styles/SearchInput.css';
import IconSearch from '../icons/IconSearch';

export default function SearchInput({ onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  // Initialize 'query' from the URL's 'search' parameter on component mount and when location.search changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialSearch = searchParams.get('search') || '';
    setQuery(initialSearch);
  }, [location.search]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    // Trim the query to remove extra whitespace
    const trimmedQuery = query.trim();
    // Update the URL and trigger search only if the query is not empty
    if (trimmedQuery) {
      // Create a new instance of URLSearchParams
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('search', trimmedQuery);
      searchParams.set('page', '1'); // Reset page to 1
      // Update the URL with the new parameters
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
      onSearch(trimmedQuery); // Trigger search with the query
    } else {
      // If the query is empty, remove the 'search' parameter from the URL
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete('search');
      searchParams.set('page', '1'); // Reset page to 1
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
      onSearch(''); // Trigger search with an empty query
    }
  };

  const hideInp = () => {
    const searchInputEl = document.getElementById('searchForm');

    // Only show the search input if on the home page or categories page
    if (
      location.pathname === HOME_PAGE_PATH ||
      location.pathname.startsWith(CATEGORIES_PAGE_PATH)
    ) {
      searchInputEl.style.display = 'block'; // Show the search input
    } else {
      searchInputEl.style.display = 'none'; // Hide the search input
    }
  };

  // Call hideInp when the location changes
  useEffect(() => {
    hideInp();
  }, [location]); // Depend on the location object

  return (
    <form
      id="searchForm"
      onSubmit={handleSubmit}
      className="border border-gray-300 w-full rounded-full h-10 flex items-center justify-center"
    >
      <div className="sm:pl-2 ml-3 h-full flex items-center w-full justify-center py-1 pr-4">
        <label htmlFor="search" className="sr-only h-full">
          Search Listings
        </label>
        <input
          type="text"
          id="search"
          className="h-full border-none outline-none bg-transparent text-black w-full flex"
          placeholder="Search listings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search Listings"
        />
        <button
          type="submit"
          className="ml-1 bg-custom-primary-color text-white rounded-full h-full hover:bg-custom-color-secondary flex-shrink-0"
          aria-label="Search Listings" // This provides an accessible label for screen readers
          title="Search Listings" // This provides an accessible label for screen readers
        >
          <div className="mr-2 ml-4">
            <IconSearch />
          </div>
        </button>
      </div>
    </form>
  );
}

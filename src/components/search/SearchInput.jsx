// src/components/search/SearchInput.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { HOME_PAGE_PATH, CATEGORIES_PAGE_PATH } from '../../config/routes';
import '../../styles/SearchInput.css';
import IconSearch from '../icons/IconSearch';

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
      className="border border-gray-300 w-full rounded-full h-10 flex items-center justify-center bg-red-200"
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
        >
          <div className="mr-2 ml-4">
            <IconSearch />
          </div>
        </button>
      </div>
    </form>
  );
}

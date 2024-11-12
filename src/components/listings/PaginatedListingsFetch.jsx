// src/components/listings/PaginatedListingsFetch.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom'; // #URLmaker
import axios from 'axios';
import ListingsList from './ListingsList';
import { useSearch } from '../context/SearchContext'; // Import the search context
import { baseUrl } from '../../config/config';

// Define the hook to clear the search term
// Initialize searchTerm from the URL if it's present
function useInitializeSearchTerm() {
  const [searchParams] = useSearchParams();
  const { searchTerm, setSearchTerm } = useSearch();
  const initialSearchTerm = useRef(searchTerm);

  useEffect(() => {
    const newSearchTerm = searchParams.get('search');
    if (newSearchTerm && initialSearchTerm.current !== newSearchTerm) {
      setSearchTerm(newSearchTerm || '');
      initialSearchTerm.current = newSearchTerm;
    }
  }, [searchParams, setSearchTerm]);
}

function PaginatedListingsFetch({
  currentPage, // Passed from LayoutBasePages.jsx
  baseFilters, // Passed from LayoutBasePages.jsx
  sortOption, // Passed from LayoutBasePages.jsx
  categoryId, // Passed from LayoutBasePages.jsx
  setTotalPages, // Passed from LayoutBasePages.jsx to control pagination
  setCategoryName, // Passed from LayoutBasePages.jsx
}) {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  const { searchTerm, setSearchTerm } = useSearch(); // Access the search term from the context
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams(); //  #URLmaker. When you
  const previousParamsRef = useRef(); // to store previous parameters
  // call setSearchParams(params), it updates the URL so to use searchParams isn't necessary

  // Initialize searchTerm when the component mounts
  useInitializeSearchTerm();

  const location = useLocation();

  useEffect(() => {
    // To quit base search query when home page is clicked
    if (!searchParams.has('search')) {
      setSearchTerm(''); // Reset search term when navigating to the home page
    }
  }, [location, searchParams, setSearchTerm]);

  // Main fetch.
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        // Combine all query parameters into a single object
        const params = {
          page: currentPage,
          sort: sortOption,
          ...(categoryId && { category: categoryId }),
          ...baseFilters,
          ...(searchTerm && { search: searchTerm }),
        };

        // Convert params object into a URL query string format. e.g. 'minPrice=&maxPrice=&town=&type=&seller='
        const queryString = new URLSearchParams(params).toString();

        // API request with all necessary query parameters
        const response = await fetch(`${baseUrl}/api/listings?${queryString}`);

        if (!response.ok) {
          throw new Error('API Request failed');
        }
        const data = await response.json();

        // Update state with the fetched listings and total pages
        setListing(data.listings || []);
        setTotalPages(data.totalPages || 1); // Ensure totalPages is being set
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          'Error fetching listings (PaginatedListingsFetch.jsx):',
          error,
        ); // Log any errors
      } finally {
        setLoading(false);
      }
    };

    fetchListings(); // Trigger the fetch when any dependencies change
  }, [
    currentPage,
    baseFilters,
    sortOption,
    categoryId,
    searchTerm, // Add searchTerm as a dependency to trigger search
    setTotalPages,
  ]);

  // Add useEffect to fetch and set category name based on categoryId - just a side fetch.
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`${baseUrl}/api/categories/${categoryId}`)
        .then((response) => {
          setCategoryName(response.data.name); // #category_TitleToIdentifyCategory.
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn('Error fetching category name:', error);
        });
    }
  }, [categoryId, setCategoryName]);

  return (
    <div>
      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Listings Display */}
      {listing.length > 0 ? (
        <ListingsList list={listing} />
      ) : (
        <p>No listings available</p> // Make sure this message appears if no data
      )}
    </div>
  );
}

export default PaginatedListingsFetch;

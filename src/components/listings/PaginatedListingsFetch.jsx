// src/components/listings/PaginatedListingsFetch.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom'; // #URLmaker
import axios from 'axios';
import ListingsList from './ListingsList';
// import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext'; // Import the search context

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
  // call setSearchParams(params), it updates the URL so to use searchParams is't necessary

  // Initialize searchTerm when the component mounts
  useInitializeSearchTerm();

  const location = useLocation();

  useEffect(() => {
    // To quit base search query when home page is clicked
    if (!searchParams.has('search')) {
      setSearchTerm(''); // Reset search term when navigating to the home page
    }
  }, [location, searchParams, setSearchTerm]);

  // For a main fetch.
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      // Create an object to hold query parameters
      const params = {
        page: currentPage,
        sort: sortOption,
        ...(categoryId && { category: categoryId }),
        ...baseFilters,
        ...(searchTerm && { search: searchTerm }), // Send searchTerm (search text) to the backend.
      };

      // Convert the params object to a URLSearchParams instance
      const newSearchParams = new URLSearchParams(params);

      // Only replace the URL if the search parameters have not changed
      if (newSearchParams.toString() !== previousParamsRef.current) {
        setSearchParams(params, { replace: true }); // +++Update the URL with new query params
        // Store the current URL parameters in the previousParamsRef
        previousParamsRef.current = newSearchParams.toString();
      }

      try {
        // Make the API request with the constructed URL
        const response = await fetch(
          `/api/listings?${newSearchParams.toString()}`,
        );
        if (!response.ok) {
          throw new Error('API Request failed');
        }
        const data = await response.json();

        // Update state with the fetched listings and total pages
        setListing(data.listings || []);
        setTotalPages(data.totalPages || 1); // Ensure totalPages is being set
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching listings:', error); // Log any errors
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
  ]); // Dependencies

  // Add useEffect to fetch and set category name based on categoryId - just a side fetch.
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:3000/api/categories/${categoryId}`)
        .then((response) => {
          setCategoryName(response.data.name); // #category_TitleToIdentifyCategory.
        })
        .catch((error) => {
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
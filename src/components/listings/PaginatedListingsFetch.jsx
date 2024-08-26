// src/components/listings/PaginatedListingsFetch.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // *Search in this case is just only URL maker. #URLmaker
import axios from 'axios';
import ListingsList from './ListingsList';
// import { useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext'; // Import the search context

function PaginatedListingsFetch({
  currentPage, // Passed from LayoutBasePages.jsx
  baseFilters, // Passed from LayoutBasePages.jsx
  sortOption, // Passed from LayoutBasePages.jsx
  categoryId, // Passed from LayoutBasePages.jsx
  setTotalPages, // Passed from LayoutBasePages.jsx to control pagination
  setCategoryName, // Passed from LayoutBasePages.jsx
}) {
  // // Log props received by PaginatedListingsFetch
  // console.log('Props in PaginatedListingsFetch:', {
  //   currentPage,
  //   baseFilters,
  //   sortOption,
  //   categoryId,
  //   setTotalPages,
  // });

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false); // For loading state

  const { searchTerm } = useSearch(); // Access the search term from the context
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams(); //  #URLmaker. When you
  // call setSearchParams(params), it updates the URL so to use searchParams is't necessary
  // const navigate = useNavigate(); // Used for programmatic navigation

  // For a main fetch.
  useEffect(() => {
    setLoading(true);

    // Create an object to hold query parameters
    const params = {
      page: currentPage,
      sort: sortOption,
      ...(categoryId && { category: categoryId }),
      ...baseFilters,
      // headerSearch: 'headerSearch',
      ...(searchTerm && { search: searchTerm }), // Send searchTerm (search text) to the backend.
    };

    // Set URL params
    setSearchParams(params); // The call will convert the object to a query string and update the
    // URL like this: http://your-site-url.com/listings?page=2&sort=price-asc&category=3&minPrice=1000&maxPrice=5000&town=New%20York&type=sell. #URLmaker

    // Construct query string for the API request
    const apiUrl = `/api/listings?${new URLSearchParams(params).toString()}`; // #URLmaker
    // console.log('Final API URL:', apiUrl); // Log the final URL

    // Fetch listings whenever any dependency changes
    const fetchListings = async () => {
      try {
        // Make the API request with the constructed URL
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('API Request failed');
        }
        const data = await response.json();

        console.log('API Response Data:', data); // Log the fetched data
        // console.log('API Response Data2:', data.listings); // Log the fetched data

        // Update state with the fetched listings and total pages
        setListing(data.listings || []);
        // console.log('Final listings:', listing);
        setTotalPages(data.totalPages || 1); // Ensure totalPages is being set
        // setCategoryName(data.listings[0].category_name);
        // console.log('category_name', data.listings[0].category_name);
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
    setSearchParams, // #URLmaker
  ]); // Dependencies

  // console.log('Final listings2:', listing);

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
      {/* <div>{listing.skelbimai_id}</div> */}
      {listing.length > 0 ? (
        <ListingsList list={listing} />
      ) : (
        <p>No listings available</p> // Make sure this message appears if no data
      )}
    </div>
  );
}

export default PaginatedListingsFetch;

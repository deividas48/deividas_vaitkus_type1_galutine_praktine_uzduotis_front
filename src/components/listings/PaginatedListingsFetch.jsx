// src/components/listings/PaginatedListingsFetch.jsx

import React, { useEffect, useState } from 'react';
import ListingsList from './ListingsList';
// import { useNavigate } from 'react-router-dom';

function PaginatedListingsFetch({
  currentPage, // Passed from LayoutBasePages.jsx
  baseFilters, // Passed from LayoutBasePages.jsx
  sortOption, // Passed from LayoutBasePages.jsx
  categoryId, // Passed from LayoutBasePages.jsx
  setTotalPages, // Passed from LayoutBasePages.jsx to control pagination
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

  useEffect(() => {
    // Log the current values of the state/props before the API call
    // console.log('Current Page:', currentPage);
    // console.log('Filters:', baseFilters);
    // console.log('Sort Option:', sortOption);

    // Construct query parameters based on the filters, sort, and pagination
    const params = new URLSearchParams({
      page: currentPage,
      sort: sortOption,
      ...(categoryId && { category: categoryId }), // Only add category if it's defined
      ...baseFilters, // Spread in baseFilters to add them to the URL
    });

    const apiUrl = `/api/listings?${params.toString()}`;
    // console.log('Final API URL:', apiUrl); // Log the final URL

    // Fetch listings whenever any dependency changes
    const fetchListings = async () => {
      try {
        // Make the API request with the constructed URL
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Handle cases where the response is not 2xx
          console.error('API Request failed:', response.statusText);
        }
        const data = await response.json();

        // console.log('API Response Data:', data); // Log the fetched data
        // console.log('API Response Data2:', data.listings); // Log the fetched data

        // Update state with the fetched listings and total pages
        setListing(data.listings);
        // console.log('Final listings:', listing);
        setTotalPages(data.totalPages); // Ensure totalPages is being set
      } catch (error) {
        console.error('Error fetching listings:', error); // Log any errors
      }
    };

    fetchListings(); // Trigger the fetch when any dependencies change
  }, [currentPage, baseFilters, sortOption, categoryId, setTotalPages]); // Dependencies

  // console.log('Final listings2:', listing);

  return (
    <div>
      <div>{listing.skelbimai_id}</div>
      {listing.length > 0 ? (
        <ListingsList list={listing} />
      ) : (
        <p>No listings available</p> // Make sure this message appears if no data
      )}
    </div>
  );
}

export default PaginatedListingsFetch;

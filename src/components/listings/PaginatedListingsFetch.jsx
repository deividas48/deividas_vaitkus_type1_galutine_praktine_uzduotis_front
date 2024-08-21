// src/components/listings/PaginatedListingsFetch.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ListingsList from './ListingsList';
// import { useNavigate } from 'react-router-dom';

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
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams(); //  when you
  // call setSearchParams(params), it updates the URL so to use searchParams is't necessary
  // const navigate = useNavigate(); // Used for programmatic navigation

  useEffect(() => {
    // Log the current values of the state/props before the API call
    // console.log('Current Page:', currentPage);
    // console.log('Filters:', baseFilters);
    // console.log('Sort Option:', sortOption);

    // Create an object to hold query parameters
    const params = {
      page: currentPage,
      sort: sortOption,
      ...(categoryId && { category: categoryId }),
      ...baseFilters,
    };

    // Set URL params
    setSearchParams(params); // The call will convert the object to a query string and update the
    // URL like this: http://your-site-url.com/listings?page=2&sort=price-asc&category=3&minPrice=1000&maxPrice=5000&town=New%20York&type=sell

    // Construct query string for the API request
    const apiUrl = `/api/listings?${new URLSearchParams(params).toString()}`;
    // console.log('Final API URL:', apiUrl); // Log the final URL

    // Fetch listings whenever any dependency changes
    const fetchListings = async () => {
      try {
        // Make the API request with the constructed URL
        const response = await fetch(apiUrl);
        if (!response.ok) {
          // Handle cases where the response is not 2xx
          // eslint-disable-next-line no-console
          console.error('API Request failed:', response.statusText);
        }
        const data = await response.json();

        console.log('API Response Data:', data); // Log the fetched data
        // console.log('API Response Data2:', data.listings); // Log the fetched data

        // Update state with the fetched listings and total pages
        setListing(data.listings);
        // console.log('Final listings:', listing);
        setTotalPages(data.totalPages); // Ensure totalPages is being set
        // setCategoryName(data.listings[0].category_name);
        // console.log('category_name', data.listings[0].category_name);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching listings:', error); // Log any errors
      }
    };

    fetchListings(); // Trigger the fetch when any dependencies change
  }, [
    currentPage,
    baseFilters,
    sortOption,
    categoryId,
    setTotalPages,
    setSearchParams,
  ]); // Dependencies

  // console.log('Final listings2:', listing);

  // Add useEffect to fetch and set category name based on categoryId.
  useEffect(() => {
    if (categoryId) {
      axios
        .get(`http://localhost:3000/api/categories/${categoryId}`)
        .then((response) => {
          setCategoryName(response.data.name); // #category_TitleToIdentifyCategory.
          // 'response.data.name' - sql table category variable name.
        })
        .catch((error) => {
          console.warn('Error fetching category name:', error);
        });
    }
  }, [categoryId, setCategoryName]);

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

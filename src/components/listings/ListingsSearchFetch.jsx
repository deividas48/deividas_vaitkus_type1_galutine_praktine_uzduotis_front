// src/components/listings/ListingsSearchFetch.jsx

import React, { useState, useEffect } from 'react';
import ListingsList from './ListingsList';
import SearchInput from '../search/SearchInput';

function ListingsSearchFetch() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchListings = async (search) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/listings?search=${encodeURIComponent(search)}`,
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setListings(data.listings || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchListings(searchTerm);
    } else {
      // Fetch all listings or handle empty search here
      setListings([]);
    }
  }, [searchTerm]);

  return (
    <div>
      {/* Search Input */}
      <SearchInput onSearch={(query) => setSearchTerm(query)} />

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Listings Display */}
      {listings.length > 0 ? (
        <ListingsList list={listings} />
      ) : (
        !loading && <p>No listings found</p>
      )}
    </div>
  );
}

export default ListingsSearchFetch;

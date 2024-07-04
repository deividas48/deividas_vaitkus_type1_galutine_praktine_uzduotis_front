/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import ListingsList from './ListingsList';

// #3_create_sort. Add the sortOption prop to the ListingsPage function. The
// prop is passed from the PageHome component.
function ListingsPage({ sortOption }) {
  const [listingsArr, setListingArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch function for listings from the server
  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        // Filter out the listings that are not published
        let sortedListing = response.data.filter(
          (listing) => listing.skelbimai_is_published === 1,
        );
        // #3.1_create_sort. SortOption. Sort the listings based on the sortOption state.
        if (sortOption === 'price-asc') {
          sortedListing = sortedListing.sort(
            (a, b) => a.skelbimai_price - b.skelbimai_price,
          );
        } else if (sortOption === 'price-desc') {
          sortedListing = sortedListing.sort(
            (a, b) => b.skelbimai_price - a.skelbimai_price,
          );
        }
        setListingArr(sortedListing); // Set the listings array with the sorted listings.
      })
      .catch((error) => {
        console.warn('Error fetching listings:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Fetch the listings from the server
  useEffect(() => {
    getPosts('http://localhost:3000/api/listings');
    // #3.2_create_sort. SortOption helps to update the listings when the sortOption
    // state changes.
  }, [sortOption]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch listings</p>}
      {/* #3.3_create_sort. Pass the sortOption prop to the */}
      {/* ListingsList component. The short ends here. */}
      {!isLoading && !isError && <ListingsList list={listingsArr} />}
    </div>
  );
}

export default ListingsPage;

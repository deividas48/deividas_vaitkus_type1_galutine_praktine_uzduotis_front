import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListingsList from '../components/listings/ListingsList';

// #create_listings_list. Component to fetch and display listings
function PageListingsCategory() {
  // 1. #category_filter. Extract category id from URL parameters
  const { id } = useParams();

  const [listingsArr, setListingsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // 1. #create_listings_list. Function to fetch listings
  function getListingsByCategory(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setListingsArr(response.data);
      })
      .catch((error) => {
        console.warn('Error fetching listings:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // 2. #create_listings_list. Fetch listings when component mounts or category id changes
  // 2. #category_filter. Fetch listings by category
  useEffect(() => {
    getListingsByCategory(`http://localhost:3000/api/listings?category=${id}`);
  }, [id]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch listings</p>}
      {!isLoading && !isError && <ListingsList list={listingsArr} />}
    </div>
  );
}

export default PageListingsCategory;

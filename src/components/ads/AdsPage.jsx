/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import AdsList from './AdsList';

// #3_create_sort. Add the sortOption prop to the AdsPage function. The
// prop is passed from the HomePage component.
function AdsPage({ sortOption }) {
  const [adsArr, setAdsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch function for ads from the server
  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        // Filter out the ads that are not published
        let sortedAds = response.data.filter(
          (ad) => ad.skelbimai_is_published === 1,
        );
        // #3.1_create_sort. SortOption. Sort the ads based on the sortOption state.
        if (sortOption === 'price-asc') {
          sortedAds = sortedAds.sort(
            (a, b) => a.skelbimai_price - b.skelbimai_price,
          );
        } else if (sortOption === 'price-desc') {
          sortedAds = sortedAds.sort(
            (a, b) => b.skelbimai_price - a.skelbimai_price,
          );
        }
        setAdsArr(sortedAds); // Set the ads array with the sorted ads.
      })
      .catch((error) => {
        console.warn('Error fetching ads:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Fetch the ads from the server
  useEffect(() => {
    getPosts('http://localhost:3000/api/listings');
    // #3.2_create_sort. SortOption helps to update the ads when the sortOption
    // state changes.
  }, [sortOption]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {/* #3.3_create_sort. Pass the sortOption prop to the */}
      {/* AdsList component. The short ends here. */}
      {!isLoading && !isError && <AdsList list={adsArr} />}
    </div>
  );
}

export default AdsPage;

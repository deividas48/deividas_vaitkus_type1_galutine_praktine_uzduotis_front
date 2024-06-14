/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import AdsList from './AdsList';

function AdsPage() {
  const [adsArr, setadsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch function for ads from the server
  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        // eslint-disable-next-line max-len
        const sortedAds = resp.data.sort((a, b) => a.skelbimai_title.localeCompare(b.skelbimai_title));
        setadsArr(sortedAds);
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
    getPosts('http://localhost:3000/api/ads');
  }, []);

  // Filter the ads array by the is_published property. Its for avoiding to show unpublished ads
  const unpublishedAds = adsArr.filter((ad) => ad.skelbimai_is_published === 1);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {!isLoading && !isError && <AdsList list={unpublishedAds} />}
    </div>
  );
}

export default AdsPage;

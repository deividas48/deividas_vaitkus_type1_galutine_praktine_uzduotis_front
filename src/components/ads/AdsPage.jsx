/* eslint-disable arrow-parens */
/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import AdsList from './AdsList';

function AdsPage() {
  const [adsArr, setadsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        const sortedAds = resp.data.sort((a, b) => a.title.localeCompare(b.title));
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

  useEffect(() => {
    getPosts('http://localhost:3000/api/ads');
  }, []);

  // Filter the ads array by the is_published property. Its for avoiding to show unpublished ads
  const unpublishedAds = adsArr.filter(ad => ad.is_published === 1);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {!isLoading && !isError && <AdsList list={unpublishedAds} />}
    </div>
  );
}

export default AdsPage;

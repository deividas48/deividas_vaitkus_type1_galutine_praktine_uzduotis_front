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
        setadsArr(resp.data);
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

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {!isLoading && !isError && <AdsList list={adsArr} />}
    </div>
  );
}

export default AdsPage;

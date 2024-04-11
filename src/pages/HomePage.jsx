/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import AdsList from '../components/ads/AdsList';

function HomePage() {
  const [adsArr, setAdsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        setAdsArr(resp.data);
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
      <Hero />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {!isLoading && !isError && <AdsList list={adsArr} />}
    </div>
  );
}

export default HomePage;

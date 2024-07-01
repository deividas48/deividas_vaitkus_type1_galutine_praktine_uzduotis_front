import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdsList from '../components/ads/AdsList';

function PageAdsCategory() {
  const { id } = useParams();
  const [adsArr, setAdsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getAdsByCategory(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setAdsArr(response.data);
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
    getAdsByCategory(`http://localhost:3000/api/ads?category=${id}`);
  }, [id]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {!isLoading && !isError && <AdsList list={adsArr} />}
    </div>
  );
}

export default PageAdsCategory;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdsList from '../components/ads/AdsList';

// #create_ads_list. Component to fetch and display ads
function PageAdsCategory() {
  // 1. #category_filter. Extract category id from URL parameters
  const { id } = useParams();

  const [adsArr, setAdsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // 1. #create_ads_list. Function to fetch ads
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

  // 2. #create_ads_list. Fetch ads when component mounts or category id changes
  // 2. #category_filter. Fetch ads by category
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

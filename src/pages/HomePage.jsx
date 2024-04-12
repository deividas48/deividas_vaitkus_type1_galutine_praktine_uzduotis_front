/* eslint-disable no-console */
// import axios from 'axios';
// import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
// import AdsList from '../components/ads/AdsList';
import CategoryPage from '../components/categories/CategoryPage';
import AdsPage from '../components/ads/AdsPage';

function HomePage() {
  // const [adsArr, setAdsArr] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // function getPosts(url) {
  //   setIsLoading(true);
  //   axios
  //     .get(url)
  //     .then((resp) => {
  //       setAdsArr(resp.data);
  //     })
  //     .catch((error) => {
  //       console.warn('Error fetching ads:', error);
  //       setIsError(true);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  // useEffect(() => {
  //   getPosts('http://localhost:3000/api/ads');
  // }, []);

  return (
    <div>

      <div className="flex min-h-screen">
        <aside className="w-1/4 bg-green-100">
          <div className=" bg-red-100 p-4 pb-1 mb-4 rounded-lg"><CategoryPage /></div>
          <div className=" bg-red-100 p-4 pb-1 rounded-lg"><CategoryPage /></div>
        </aside>
        <main className="w-3/4 bg-blue-100 p-4">
          {/* <h1>Our listings</h1> */}
          <AdsPage />
          {/* {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to fetch ads</p>}
          {!isLoading && !isError && <AdsList list={adsArr} />} */}
        </main>
      </div>

      <div>
        <AdsPage />
      </div>
      <div>
        <CategoryPage />
      </div>
      <div>
        <CategoryPage />
      </div>
      <Hero />
      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch ads</p>}
      {!isLoading && !isError && <AdsList list={adsArr} />} */}
    </div>
  );
}

export default HomePage;

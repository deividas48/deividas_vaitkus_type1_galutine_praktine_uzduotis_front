/* eslint-disable no-console */
// import axios from 'axios';
// import { useState, useEffect } from 'react';
import Hero2 from '../components/Hero2';
// import AdsList from '../components/ads/AdsList';
import CategoryPage from '../components/categories/CategoryPage';
import AdsPage from '../components/ads/AdsPage';
import TownsPage from './TownsPage';

function HomePage() {
  return (
    <div>
      <Hero2 />
      {/* All the ads and categories are displayed here */}
      <div className="md:flex min-h-screen">
        <aside className="md:w-1/4">
          <div>
            {/* All the towns are displayed here */}
            <div className=" bg-white p-4 pt-1 mb-4 rounded-lg">
              <TownsPage />
            </div>
          </div>
          {/* All the categories are displayed here */}
          <div className=" bg-white p-4 pb-1 rounded-lg">
            <CategoryPage />
          </div>
        </aside>
        <main className="md:w-3/4 my-4 md:my-0 md:p-4 md:pt-0">
          {/* <h1>Our listings</h1> */}
          {/* All the ads are displayed here */}
          <AdsPage />
        </main>
      </div>
    </div>
  );
}

export default HomePage;

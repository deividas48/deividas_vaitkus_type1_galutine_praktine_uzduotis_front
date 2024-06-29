/* eslint-disable no-console */
// import axios from 'axios';
// import { useState, useEffect } from 'react';
// #1_create_sort - import useState from react.
import { useState } from 'react';
import Hero2 from '../components/Hero2';
// import AdsList from '../components/ads/AdsList';
import CategoryPage from '../components/categories/CategoryPage';
import AdsPage from '../components/ads/AdsPage';

function HomePage() {
  // #Create_sort - create short function for sorting ads.
  // #1_create_sort. Create the state to store the sort option.
  // 'price-asc' - sort by price ascending.
  const [sortOption, setSortOption] = useState('price-asc');

  return (
    <div>
      <Hero2 />
      {/* #2_create_sort. Create the div for the sort dropdown. */}
      <div className="mb-4 flex mr-4">
        {/* Just to make blank space */}
        <span className="md:w-3/5"> </span>
        <div className="md:w-2/5 flex">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 w-2/4 text-right content-center pr-4"
          >
            Sort by:
          </label>
          <select
            id="sort"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              // The value of the dropdown is the sortOption state.
            value={sortOption}
              // #2.1_create_sort. Update the SortOption state. OnChange event - when the value
              // of the dropdown changes, the setSortOption function is called with the new
              // value.
            onChange={(e) => setSortOption(e.target.value)}
          >
            {/* #2.2_create_sort. Add the options for sorting. */}
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      {/* All the ads and categories are displayed here */}
      <div className="md:flex">
        <aside className="md:w-1/4">
          {/* All the categories are displayed here */}
          <div className=" bg-white p-4 pb-1 rounded-lg">
            <CategoryPage />
          </div>
        </aside>
        <main className="md:w-3/4 my-4 md:my-0 md:p-4 md:pt-0">
          {/* <h1>Our listings</h1> */}
          {/* All the ads are displayed here */}
          {/* #3_create_sort. Pass the sortOption state to the AdsPage file. */}
          <AdsPage sortOption={sortOption} />
        </main>
      </div>
    </div>
  );
}

export default HomePage;

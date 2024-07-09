/* eslint-disable max-len */
import { useState } from 'react';
import CategoryPage from '../components/categories/CategoryPage';

// #create_sort - create reusable layout component
function PageMain({
  HeroComponent,
  listingsFetchComponent: ListingsFetchComponent, // Component for fetching and displaying listings
  pageTitle,
}) {
  // 1_#create_sort. Create the state to store the sort option.
  // 'price-asc' - sort by price ascending.
  const [sortOption, setSortOption] = useState('price-asc');
  // 1_#category_TitleToIdentifyCategory.
  const [categoryName, setCategoryName] = useState('');

  return (
    <div>
      {/* Display the page title */}
      <h1>{pageTitle}</h1>
      <HeroComponent />

      {/* Create the div for the sort dropdown */}
      <section className="mb-4 flex mr-4">
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
            // 2.1_#create_sort. Update the SortOption state. OnChange event - when the value
            // of the dropdown changes, the setSortOption function is called with the new
            // value.
            onChange={(e) => setSortOption(e.target.value)}
          >
            {/* 2.2_#create_sort. Add the options for sorting. */}
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* All the listings and categories are displayed here */}
      <div className="md:flex">
        <aside className="md:w-1/4">
          {/* All the categories are displayed here */}
          <div className="bg-white p-4 pb-1 rounded-lg">
            {/* 5_#category_TitleToIdentifyCategory. */}
            <h2>{categoryName ? `Category: ${categoryName}` : ''}</h2>
            <CategoryPage />
          </div>
        </aside>

        <main className="md:w-3/4 my-4 md:my-0 md:p-4 md:pt-0">
          {/* All the listings are displayed here */}
          {/* Send 'sortOption' */}
          <ListingsFetchComponent
            sortOption={sortOption} // Send the set state to PageListingsCategory.jsx
            setCategoryName={setCategoryName} // 2_#category_TitleToIdentifyCategory. Send the set state to PageListingsCategory.jsx
          />
        </main>
      </div>
    </div>
  );
}

export default PageMain;

/* eslint-disable max-len */
// src/components/layout/LayoutBasePages.jsx

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LayoutBasePages.css';
import PaginatedListingsFetch from '../listings/PaginatedListingsFetch';

// #create_sort - create reusable layout component
// - Props are taken from PageHome.jsx and PageListingsCategory.jsx
function LayoutBasePages({
  HeroComponent,
  // listingsFetchComponent: ListingsFetchComponent, // Component for fetching and displaying listings
  // listingsFetchComponentProps, // #CreateFiltersLayoutBasePages
  welcome,
  ifcategory,
  aside1,
  aside2,
  ifCategoryPageDisplayed,
  // #basePagination
  listingsFetchComponentProps, // Props needed for fetching data
}) {
  // Log props received by LayoutBasePages
  // console.log('Props received by LayoutBasePages:', {
  //   HeroComponent,
  //   welcome,
  //   ifcategory,
  //   aside1,
  //   aside2,
  //   ifCategoryPageDisplayed,
  //   listingsFetchComponentProps,
  // });

  // 1_#create_sort. Create the state to store the sort option.
  // 'price-asc' - sort by price ascending.
  const [sortOption, setSortOption] = useState('date-desc');
  // 1_#category_TitleToIdentifyCategory.
  const [categoryName, setCategoryNameState] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPagesState] = useState(1);

  // Memoize functions
  const setTotalPages = useCallback((pages) => setTotalPagesState(pages), []);
  const setCategoryName = useCallback((name) => setCategoryNameState(name), []);

  // #basePagination
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
    // Automatically trigger the listing fetch with the new page
  };

  console.log('currentPage===', currentPage);

  return (
    <div>
      {/* Hero */}
      <HeroComponent
        welcome={welcome}
        ifcategory={ifcategory}
        currentCategory={categoryName}
      />

      {/* Create the div for the sort dropdown */}
      <section className="mb-4 flex mr-4">
        {/* Just to make proportion */}
        <span className="md:w-3/5">
          {/* {' '}
          {categoryName ? `Category: ${categoryName}` : ''}
          {' '} */}

          {/* Path to navigate */}
          <p className="AllCategoriesName-color">
            <Link className="mr-1" to="/">
              All Categories
            </Link>
            {categoryName && (
              <>
                <span className="mx-1"> &gt; </span>
                <span className="categoryName-color">{categoryName}</span>
              </>
            )}
          </p>
        </span>
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
            <option value="date-asc">Date: Oldest First</option>
            <option value="date-desc">Date: Newest First</option>
          </select>
        </div>
      </section>

      {/* All the listings and categories are displayed here */}
      <section className="md:flex">
        <aside className="md:w-1/4">
          {!ifCategoryPageDisplayed && (
            <>
              {/* All the categories are displayed here */}
              <div className="bg-white p-4 pb-1 rounded-lg mb-4">
                {/* 5_#category_TitleToIdentifyCategory. */}
                <h3 className="cssTitle">Categories</h3>
                {/* #PassToAside */}
                {aside1}
              </div>
            </>
          )}
          <div className="bg-white p-4 pb-1 rounded-lg">
            <h3 className="cssTitle">Filter Listing</h3>
            {/* #CreateFiltersLayoutBasePages */}
            {aside2}
          </div>
        </aside>

        {/* Main Listings Section */}
        <main className="md:w-3/4 my-4 md:my-0 md:p-4 md:pt-0">
          {/* // +#basePagination */}
          <PaginatedListingsFetch
            currentPage={currentPage}
            baseFilters={listingsFetchComponentProps.baseFilters} // #CreateFiltersLayoutBasePages
            sortOption={sortOption}
            categoryId={listingsFetchComponentProps.categoryId}
            setTotalPages={setTotalPages}
            setCategoryName={setCategoryName} // Function to set the category name
          />

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages)].map((_, index) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                type="button"
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 rounded min-h-10 min-w-10 ${
                  index + 1 === currentPage
                    ? 'bg-custom-primary-color text-white'
                    : 'bg-white text-custom-gray-color'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}

export default LayoutBasePages;

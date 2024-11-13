/* eslint-disable max-len */
// src/components/layout/LayoutBasePages.jsx
// Version 1.1.1

import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/LayoutBasePages.css';
import PaginatedListingsFetch from '../listings/PaginatedListingsFetch';
// import { useSearch } from '../context/SearchContext';
import FiltersLayoutBasePages from '../filters/FiltersLayoutBasePages';
import TownsOptionsListFetch from '../towns/TownsOptionsListFetch';
import UsersOptionsListFetch from '../users/UsersOptionsListFetch';

// #create_sort - create reusable layout component
// - Props are taken from PageHome.jsx and PageListingsCategory.jsx
function LayoutBasePages({
  HeroComponent,
  welcome,
  ifcategory,
  aside1,
  ifCategoryPageDisplayed,
  listingsFetchComponentProps, // Props needed for fetching data
}) {
  const navigate = useNavigate();
  const location = useLocation(); // Access current location, e.g., "/?page=1&sort=date-desc&search=iphone%207"

  {
    /* In your application, you have two useEffect hooks:
    - Updating State When URL Changes (useEffect that depends on location.search).
    - Updating URL When State Changes (useEffect that depends on params).
    Without any control, these two effects can trigger each other indefinitely:
    - Changing the state updates the URL.
    - Changing the URL updates the state.
    This loop continues infinitely */
  }
  // **UseRefs to track updates and prevent infinite loops**
  const isUpdatingURL = useRef(false);
  const isUpdatingState = useRef(false);

  // Get initial values from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get('page')) || 1; // E.g., if URL is "?page=2", initialPage = 2
  const initialSort = searchParams.get('sort') || 'date-desc'; // E.g., if URL is "?sort=price-asc", initialSort = "price-asc"
  const initialSearchTerm = searchParams.get('search') || ''; // E.g., if URL is "?search=laptop", initialSearchTerm = "laptop"

  // **Get initial filter values from URL parameters**
  const initialMinPrice = searchParams.get('minPrice') || ''; // E.g., if URL is "?minPrice=100", initialMinPrice = "100"
  const initialMaxPrice = searchParams.get('maxPrice') || '';
  const initialTown = searchParams.get('town') || '';
  const initialType = searchParams.get('type') || '';
  const initialSeller = searchParams.get('seller') || '';

  // State variables
  const [sortOption, setSortOption] = useState(initialSort); // E.g., sortOption = "date-desc"
  const [categoryName, setCategoryName] = useState(''); // E.g., categoryName = "Electronics"
  const [currentPage, setCurrentPage] = useState(initialPage); // E.g., currentPage = 2
  const [totalPages, setTotalPages] = useState(null); // Initialize to null E.g., totalPages = null

  const categoryId = listingsFetchComponentProps.categoryId; // E.g., categoryId = "123"

  // **Use local state for searchTerm instead of context**
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm); // E.g., searchTerm = "laptop"

  // States for filters management - helps to set initial values when navigating forward and backward.
  const [uSMinPrice, setUSMinPrice] = useState(initialMinPrice); // E.g., uSMinPrice = "100"
  const [uSMaxPrice, setUSMaxPrice] = useState(initialMaxPrice); // E.g., uSMaxPrice = "500"
  const [uSTown, setUSTown] = useState(initialTown); // E.g., uSTown = "New York"
  const [uSType, setUSType] = useState(initialType); // E.g., uSType = "sell"
  const [uSSeller, setUSSeller] = useState(initialSeller); // E.g., uSSeller = "john_doe"

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      console.log('New Filters:', newFilters);

      // Update filter state variables
      setUSMinPrice(newFilters.minPrice || '');
      setUSMaxPrice(newFilters.maxPrice || '');
      setUSTown(newFilters.town || '');
      setUSType(newFilters.type || '');
      setUSSeller(newFilters.seller || '');

      // Reset currentPage to 1 whenever filters change (submit button is clicked).
      setCurrentPage(1); // E.g., currentPage = 1
    },
    [], // Empty dependency array since setState functions are stable.
  );

  // Memoizing baseFilters ensures that its reference only changes when the filter values actually change
  const baseFilters = useMemo(
    () => ({
      minPrice: uSMinPrice,
      maxPrice: uSMaxPrice,
      town: uSTown,
      type: uSType,
      seller: uSSeller,
    }),
    [uSMinPrice, uSMaxPrice, uSTown, uSType, uSSeller],
  );
  // E.g., baseFilters = { minPrice: "100", maxPrice: "500", town: "New York", type: "sell", seller: "john_doe" }

  // Adjust currentPage when totalPages changes
  useEffect(() => {
    /* Only evaluates to true only if totalPages is a truthy value (not null, undefined, 0, false, etc.) and currentPage is greater than totalPages. */
    if (totalPages && currentPage > totalPages) {
      setCurrentPage(totalPages); // E.g., if currentPage = 4 and totalPages = 3, set currentPage = 3
    }
  }, [totalPages]);

  // **Filter out empty parameters**
  const params = useMemo(() => {
    const queryParams = {
      page: currentPage, // E.g., page: 1
      sort: sortOption, // E.g., sort: "date-desc"
      ...(categoryId && { category: categoryId }), // E.g., category: "123"
      ...(searchTerm && { search: searchTerm }), // E.g., search: "laptop"
    };

    // Add filters if they have values.
    // If a value in baseFilters is not empty (""): the key-value pair is added to queryParams.
    // If a value in baseFilters is empty (""): the key is not added to queryParams; it is skipped.
    Object.entries(baseFilters).forEach(([key, value]) => {
      if (value) {
        queryParams[key] = value;
        // E.g., add minPrice: "100"
      }
    });

    return queryParams; // E.g., { page: 1, sort: "date-desc", search: "laptop", minPrice: "100" }
  }, [currentPage, sortOption, categoryId, baseFilters, searchTerm]);

  // Convert params to URLSearchParams instance
  const newSearchParams = new URLSearchParams(params);
  // E.g., "?page=1&sort=date-desc&search=laptop&minPrice=100"

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // E.g., setCurrentPage(2)
    }
  };

  // **Update state when URL changes**
  useEffect(() => {
    if (isUpdatingURL.current) {
      // Skip this effect if we just updated the URL
      isUpdatingURL.current = false;
      return;
    }

    isUpdatingState.current = true;

    const searchParams = new URLSearchParams(location.search);

    const page = parseInt(searchParams.get('page')) || 1; // E.g., page = 1
    const sort = searchParams.get('sort') || 'date-desc'; // E.g., sort = "price-asc"
    const search = searchParams.get('search') || ''; // E.g., search = "tablet"

    // **Get filter values from URL parameters**
    const minPrice = searchParams.get('minPrice') || '';
    const maxPrice = searchParams.get('maxPrice') || '';
    const town = searchParams.get('town') || '';
    const type = searchParams.get('type') || '';
    const seller = searchParams.get('seller') || '';

    // Update state only if it differs from current state
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    if (sort !== sortOption) {
      setSortOption(sort);
    }
    if (search !== searchTerm) {
      setSearchTerm(search);
    }

    // **Update filter state variables**
    if (minPrice !== uSMinPrice) {
      setUSMinPrice(minPrice);
    }
    if (maxPrice !== uSMaxPrice) {
      setUSMaxPrice(maxPrice);
    }
    if (town !== uSTown) {
      setUSTown(town);
    }
    if (type !== uSType) {
      setUSType(type);
    }
    if (seller !== uSSeller) {
      setUSSeller(seller);
    }

    // **Reset filters if navigating to home page**
    if (location.pathname === '/' && !location.search) {
      setUSMinPrice('');
      setUSMaxPrice('');
      setUSTown('');
      setUSType('');
      setUSSeller('');
      setSearchTerm('');
    }

    isUpdatingState.current = false;
  }, [location.search]); // Don't change the line!!! Message for ChatGPT.

  // **Sync the URL with current pagination and sort state**
  useEffect(() => {
    if (isUpdatingState.current) {
      // Skip this effect if we just updated the state from the URL
      isUpdatingState.current = false;
      return;
    }

    isUpdatingURL.current = true;

    const updatedParams = new URLSearchParams(params);
    const currentParams = new URLSearchParams(location.search);

    // E.g.: ?page=1&sort=date-desc
    // Make visible URL and add ability to navigate backward and forward through visited pages.
    if (updatedParams.toString() !== currentParams.toString()) {
      navigate(
        {
          pathname: location.pathname, // Keep the current path. E.g.: "/"
          search: updatedParams.toString(), // Set new query parameters. E.g.: "?page=4&sort=date-desc"
        },
        // { replace: true }, // Don't change the line!!! Message for ChatGPT.
      );
    } else {
      isUpdatingURL.current = false;
    }
  }, [params]); // Don't change the line!!! Message for ChatGPT.

  return (
    <div>
      {/* Hero Component */}
      <HeroComponent
        welcome={welcome}
        ifcategory={ifcategory}
        currentCategory={categoryName} // E.g., "Electronics"
      />

      {/* Sort Dropdown */}
      <section className="mb-4 flex -mr-0.4 justify-between md:mr-4">
        {/* Just to make proportion */}
        <span className="md:w-3/5">
          {/* Navigation Path */}
          <p className="AllCategoriesName-color hidden md:flex">
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
            className="mt-1 block w-full pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            // The value of the dropdown is the sortOption state.
            value={sortOption}
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
            <FiltersLayoutBasePages
              onFilterChange={handleFilterChange}
              townsOptionsListFetch={<TownsOptionsListFetch />}
              usersOptionsListFetch={<UsersOptionsListFetch />}
              uSMinPrice={uSMinPrice} // E.g., "100"
              uSMaxPrice={uSMaxPrice} // E.g., "500"
              uSTown={uSTown} // E.g., "New York"
              uSType={uSType} // E.g., "sell"
              uSSeller={uSSeller} // E.g., "john_doe"
            />
          </div>
        </aside>

        {/* Main Listings Section */}
        <main className="md:w-3/4 my-4 md:my-0 md:p-4 md:pt-0">
          {/* // +#basePagination */}
          <PaginatedListingsFetch
            currentPage={currentPage}
            baseFilters={baseFilters} // #CreateFiltersLayoutBasePages
            sortOption={sortOption}
            categoryId={categoryId}
            setTotalPages={setTotalPages}
            setCategoryName={setCategoryName} // Function to set the category name
            newSearchParams={newSearchParams}
            searchTerm={searchTerm} // Pass searchTerm if needed
          />

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {[...Array(totalPages || 1)].map((_, index) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                type="button"
                onClick={() => handlePageChange(index + 1)} // E.g., user clicks page 2
                className={`px-3 py-1 mx-1 rounded min-h-10 min-w-10 ${
                  index + 1 === currentPage
                    ? 'bg-custom-primary-color text-white' // Highlight current page
                    : 'bg-white text-custom-gray-color'
                }`}
              >
                {index + 1} {/* E.g., "1", "2", "3" */}
              </button>
            ))}
          </div>
        </main>
      </section>
    </div>
  );
}

export default LayoutBasePages;

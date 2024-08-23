/* eslint-disable no-console */
// src/pages/PageSearchListings.jsx

import React, { useState } from 'react';
import LayoutBasePages from '../components/layout/LayoutBasePages';
import Hero from '../components/Hero';
import CategoryListFetch from '../components/categories/CategoryListFetch'; // #PassToAside_category
import FiltersLayoutBasePages from '../components/filters/FiltersLayoutBasePages'; // #CreateFiltersLayoutBasePages
import TownsOptionsListFetch from '../components/towns/TownsOptionsListFetch'; // #townsOptionsInput
import UsersOptionsListFetch from '../components/users/UsersOptionsListFetch'; // #usersOptionsInput

function PageSearchListings() {
  const [baseFilters, setBaseFilters] = useState({}); // #CreateFiltersLayoutBasePages

  // Create the function to handle submitted filter inputs latter
  const handleFilterChange = (newFilters) => {
    // == function handleFilterChange(newFilters) {
    console.log('New Filters:', newFilters); // Debug log to check filter values
    setBaseFilters(newFilters);
  }; // #CreateFiltersLayoutBasePages

  return (
    <LayoutBasePages
      HeroComponent={Hero}
      // listingsFetchComponent={ListingsFetchWrapper}
      listingsFetchComponentProps={{ baseFilters }} // #CreateFiltersLayoutBasePages
      welcome="Welcome to EveryShop Home Page"
      /* #PassToAside_category */
      aside1={<CategoryListFetch />} // #PassToAside
      // #CreateFiltersLayoutBasePages
      aside2={(
        <FiltersLayoutBasePages
          onFilterChange={handleFilterChange}
          townsOptionsListFetch={<TownsOptionsListFetch />} // #townsOptionsInput
          usersOptionsListFetch={<UsersOptionsListFetch />} // #usersOptionsInput
        />
      )}
    />
  );
}

export default PageSearchListings;

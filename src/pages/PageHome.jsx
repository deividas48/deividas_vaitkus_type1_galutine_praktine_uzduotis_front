/* eslint-disable no-console */
// src/pages/PageHome.jsx

import React, { useState } from 'react';
import LayoutBasePages from '../components/layout/LayoutBasePages';
import Hero from '../components/hero/Hero';
import CategoryListFetch from '../components/categories/CategoryListFetch'; // #PassToAside_category

function PageHome() {
  const [baseFilters, setBaseFilters] = useState({}); // #CreateFiltersLayoutBasePages

  return (
    <LayoutBasePages
      HeroComponent={Hero}
      // listingsFetchComponent={ListingsFetchWrapper}
      listingsFetchComponentProps={{ baseFilters }} // #CreateFiltersLayoutBasePages
      welcome="Welcome to EveryShop Home Page"
      /* #PassToAside_category */
      aside1={<CategoryListFetch />} // #PassToAside
      // #CreateFiltersLayoutBasePages
      // aside2={
      //   <FiltersLayoutBasePages
      //     onFilterChange={handleFilterChange}
      //     townsOptionsListFetch={<TownsOptionsListFetch />} // #townsOptionsInput
      //     usersOptionsListFetch={<UsersOptionsListFetch />} // #usersOptionsInput
      //   />
      // }
    />
  );
}

export default PageHome;

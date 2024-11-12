/* eslint-disable no-console */
// src/pages/PageListingsCategory.jsx
/* eslint-disable max-len */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import LayoutBasePages from '../components/layout/LayoutBasePages';
// import CategoryListFetch from '../components/categories/CategoryListFetch'; // #PassToAside_category
import FiltersLayoutBasePages from '../components/filters/FiltersLayoutBasePages'; // #CreateFiltersLayoutBasePages

function PageListingsCategory() {
  const [baseFilters, setBaseFilters] = useState({}); // #CreateFiltersLayoutBasePages
  const { id } = useParams(); // Get category ID from URL params

  const handleFilterChange = (newFilters) => {
    console.log('New Filters:', newFilters); // Debug log to check filter values
    setBaseFilters(newFilters);
  }; // #CreateFiltersLayoutBasePages

  return (
    // LayoutBasePages.jsx
    <LayoutBasePages
      HeroComponent={Hero} // Pass the 'Hero' component as the HeroComponent prop.
      // *
      // Pass ListingsFetchWrapper function (category id and sort naming) as the
      // prop named 'listingsFetchComponent'
      // #category_TitleToIdentifyCategory
      // listingsFetchComponent={ListingsFetchWrapper}
      listingsFetchComponentProps={{ baseFilters, categoryId: id }} // Pass baseFilters and categoryId directly as props
      welcome="Category Listings Page"
      ifcategory="Category: "
      ifCategoryPageDisplayed // means the same as 'ifCategoryExist={true}'
      // aside1={<CategoryListFetch />} // #PassToAside
      // #CreateFiltersLayoutBasePages
      aside2={<FiltersLayoutBasePages onFilterChange={handleFilterChange} />}
    />
  );
}

export default PageListingsCategory;

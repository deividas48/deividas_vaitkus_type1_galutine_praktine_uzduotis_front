// src/components/listings/ListingsFetchWrapper.jsx

import React from 'react';
import ListingsListFetch from './ListingsListFetch';

// Define the nested component outside the render method
// function helps to connect LayoutBasePages.jsx with ListingsListFetch through PageHome.jsx
// - 'sortOption', 'setCategoryName' are taken from LayoutBasePages.jsx
function ListingsFetchWrapper({
  sortOption,
  setCategoryName,
  baseFilters, // #CreateFiltersLayoutBasePages
  categoryId,
}) {
  // console.log('ListingsFetchWrapper baseFilters:', baseFilters); // Log baseFilters

  return (
    <ListingsListFetch
      sortOption={sortOption}
      setCategoryName={setCategoryName}
      baseFilters={baseFilters} // #CreateFiltersLayoutBasePages
      categoryId={categoryId} // Pass categoryId to ListingsListFetch
    />
  );
}

export default ListingsFetchWrapper;

/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import ListingsListFetch from '../components/listings/ListingsListFetch';
import Hero from '../components/Hero';
import LayoutBasePages from '../components/layout/LayoutBasePages';

// Define the nested component outside the render method
// - 'sortOption' is taken from LayoutBasePages.jsx
// - 'setCategoryName' is taken from LayoutBasePages.jsx
function ListingsFetchWrapper({ sortOption, setCategoryName }) {
  // Get category ID from URL params. Gets the URL parameters directly from the
  // URL defined in your route configuration (App.jsx).
  const { id } = useParams();

  return (
    <ListingsListFetch
      categoryId={id} // Send to ListingsListFetch.jsx
      sortOption={sortOption} // Take and send to ListingsListFetch.jsx
      setCategoryName={setCategoryName} // 3_#category_TitleToIdentifyCategory. Take and send to ListingsListFetch.jsx
    />
  );
}

function PageListingsCategory() {
  return (
    <LayoutBasePages
      HeroComponent={Hero} // Pass the 'Hero' component as the HeroComponent prop.
      // *
      // Pass ListingsFetchWrapper function (category id and sort naming) as the
      // prop named 'listingsFetchComponent'
      // #category_TitleToIdentifyCategory
      listingsFetchComponent={ListingsFetchWrapper}
    />
  );
}

export default PageListingsCategory;

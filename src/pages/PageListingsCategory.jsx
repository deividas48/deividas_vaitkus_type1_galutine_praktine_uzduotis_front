/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import ListingsListFetch from '../components/listings/ListingsListFetch';
import Hero2 from '../components/Hero2';
import PageMain from './PageMain';

// Define the nested component outside the render method
// - 'sortOption' is taken from PageMain.jsx
// - 'setCategoryName' is taken from PageMain.jsx
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
    <PageMain
      HeroComponent={Hero2} // Pass the Hero2 component as the HeroComponent prop.
      // *
      // Pass ListingsFetchWrapper function (category id and sort naming) as the
      // prop named 'listingsFetchComponent'
      // #category_TitleToIdentifyCategory
      listingsFetchComponent={ListingsFetchWrapper}
      pageTitle="Listings Category" // Set the page title to "Listings Category"
    />
  );
}

export default PageListingsCategory;

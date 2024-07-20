/* eslint-disable max-len */
import { useParams } from 'react-router-dom';
import ListingsListFetch from '../components/listings/ListingsListFetch';
import Hero from '../components/Hero';
import LayoutBasePages from '../components/layout/LayoutBasePages';
// import CategoryListFetch from '../components/categories/CategoryListFetch'; // #PassToAside

// Define the nested component outside the render method
// - 'sortOption', 'setCategoryName' are taken from LayoutBasePages.jsx
function ListingsFetchWrapper({ sortOption, setCategoryName }) {
  // Get category ID from URL params. Gets the URL parameters directly from the
  // URL defined in your route configuration (App.jsx).
  const { id } = useParams();

  return (
    // ListingsListFetch.jsx
    <ListingsListFetch
      categoryId={id} // Send to ListingsListFetch.jsx
      sortOption={sortOption} // Take and send to ListingsListFetch.jsx
      setCategoryName={setCategoryName} // 3_#category_TitleToIdentifyCategory. Take and send.
    />
  );
}

function PageListingsCategory() {
  return (
    // LayoutBasePages.jsx
    <LayoutBasePages
      HeroComponent={Hero} // Pass the 'Hero' component as the HeroComponent prop.
      // *
      // Pass ListingsFetchWrapper function (category id and sort naming) as the
      // prop named 'listingsFetchComponent'
      // #category_TitleToIdentifyCategory
      listingsFetchComponent={ListingsFetchWrapper}
      ifcategory="Category: "
      ifCategoryPageDisplayed // means the same as 'ifCategoryExist={true}'
      // aside1={<CategoryListFetch />} // #PassToAside
    />
  );
}

export default PageListingsCategory;

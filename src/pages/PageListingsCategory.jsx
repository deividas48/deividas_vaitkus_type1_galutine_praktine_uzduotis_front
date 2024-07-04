import { useParams } from 'react-router-dom';
import ListingsListFetch from '../components/listings/ListingsListFetch';
import Hero2 from '../components/Hero2';
import PageMain from './PageMain';

// Define the nested component outside the render method
function ListingsFetchWrapper({ sortOption }) {
  const { id } = useParams(); // Get category ID from URL params
  return <ListingsListFetch categoryId={id} sortOption={sortOption} />;
}

function PageListingsCategory() {
  return (
    <PageMain
      HeroComponent={Hero2}
      // Pass categoryId and sortOption to ListingsListFetch
      listingsFetchComponent={ListingsFetchWrapper}
      pageTitle="Listings Category"
    />
  );
}

export default PageListingsCategory;

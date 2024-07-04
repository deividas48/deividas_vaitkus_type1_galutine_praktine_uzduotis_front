// PageHome.jsx
import PageMain from './PageMain';
import Hero2 from '../components/Hero2';
import ListingsListFetch from '../components/listings/ListingsListFetch';

function PageHome() {
  return (
    <PageMain
      HeroComponent={Hero2}
      listingsFetchComponent={ListingsListFetch}
      pageTitle="Home Page"
    />
  );
}

export default PageHome;

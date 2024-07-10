// PageHome.jsx
import LayoutBasePages from '../components/layout/LayoutBasePages';
import Hero2 from '../components/Hero2';
import ListingsListFetch from '../components/listings/ListingsListFetch';

function PageHome() {
  return (
    <LayoutBasePages
      HeroComponent={Hero2}
      listingsFetchComponent={ListingsListFetch}
      pageTitle="Home Page"
    />
  );
}

export default PageHome;

// PageHome.jsx
import LayoutBasePages from '../components/layout/LayoutBasePages';
import Hero from '../components/Hero';
import ListingsListFetch from '../components/listings/ListingsListFetch';

function PageHome() {
  return (
    <LayoutBasePages
      HeroComponent={Hero}
      listingsFetchComponent={ListingsListFetch}
      welcome="Welcome to EveryShop Home Page"
      // pageTitle="Home Page > "
    />
  );
}

export default PageHome;

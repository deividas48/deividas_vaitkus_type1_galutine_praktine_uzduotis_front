// PageHome.jsx
import LayoutBasePages from '../components/layout/LayoutBasePages';
import Hero from '../components/Hero';
import ListingsListFetch from '../components/listings/ListingsListFetch';
import CategoryListFetch from '../components/categories/CategoryListFetch'; // #PassToAside

function PageHome() {
  return (
    <LayoutBasePages
      HeroComponent={Hero}
      listingsFetchComponent={ListingsListFetch}
      welcome="Welcome to EveryShop Home Page"
      // pageTitle="Home Page > "
      aside1={<CategoryListFetch />} // #PassToAside
    />
  );
}

export default PageHome;

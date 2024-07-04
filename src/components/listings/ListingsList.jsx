import ListingPage from './ListingPage';

// #create_listings_list. Component to render a list of listings
export default function ListingsList({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((listing) => (
          // 1. #create_listings_list. Render each listing using ListingPage component
          <li className="mb-4" key={listing.skelbimai_id}>
            <ListingPage item={listing} />
          </li>
        ))}
      </ul>
    </div>
  );
}

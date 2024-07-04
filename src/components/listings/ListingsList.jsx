import ListingForLi from './ListingForLi';

// #create_listings_list. Component to render a list of listings
export default function ListingsList({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((listing) => (
          // 1. #create_listings_list. Render each listing using ListingForLi component
          <li className="mb-4" key={listing.skelbimai_id}>
            <ListingForLi item={listing} />
          </li>
        ))}
      </ul>
    </div>
  );
}

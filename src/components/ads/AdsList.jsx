import AdPage from './AdPage';

// #create_ads_list. Component to render a list of ads
export default function AdsList({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((ad) => (
          // 1. #create_ads_list. Render each ad using AdPage component
          <li className="mb-4" key={ad.skelbimai_id}>
            <AdPage item={ad} />
          </li>
        ))}
      </ul>
    </div>
  );
}

import AdPage from './AdPage';

export default function AdsList({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((ad) => (
          <li className="mb-4" key={ad.skelbimai_id}>
            <AdPage item={ad} />
          </li>
        ))}
      </ul>
    </div>
  );
}

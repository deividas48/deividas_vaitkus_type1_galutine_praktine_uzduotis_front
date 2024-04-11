import AdPage from './AdPage';

export default function AdsList({ list }) {
  return (
    <div>
      <h1>AdsList</h1>
      <ul className="unstyled">
        {list.map((ad) => (
          <li className="mb-4" key={ad.id}>
            <AdPage item={ad} />
          </li>
        ))}
      </ul>
    </div>
  );
}

import CategoryListForLiMap from './CategoryListForLiMap';

export default function CategoryListLiMap({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((category) => (
          <li className="mb-4" key={category.id}>
            <CategoryListForLiMap item={category} />
          </li>
        ))}
      </ul>
    </div>
  );
}

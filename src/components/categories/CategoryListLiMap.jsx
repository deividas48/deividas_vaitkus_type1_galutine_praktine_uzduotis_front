import CategoryListForLiMap from './CategoryListForLiMap';

export default function CategoryListLiMap({ list }) {
  return (
    <ul className="unstyled">
      {list.map((category) => (
        <li className="h-11" key={category.id}>
          <CategoryListForLiMap item={category} />
        </li>
      ))}
    </ul>
  );
}

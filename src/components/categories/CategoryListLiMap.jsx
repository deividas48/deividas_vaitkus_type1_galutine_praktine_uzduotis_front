import CategoryListForLiMap from './CategoryListForLiMap';
import '../../styles/CategoryListLiMap.css';

export default function CategoryListLiMap({ list }) {
  return (
    <>
      <h3 className="cssTitle">Categories</h3>
      <ul className="unstyled">
        {list.map((category) => (
          <li className="mb-4" key={category.id}>
            <CategoryListForLiMap item={category} />
          </li>
        ))}
      </ul>
    </>
  );
}

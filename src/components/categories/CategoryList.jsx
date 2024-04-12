import CategoryListLi from './CategoryPageLi';

export default function CategoryList({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((category) => (
          <li className="mb-4" key={category.id}>
            <CategoryListLi item={category} />
          </li>
        ))}
      </ul>
    </div>
  );
}

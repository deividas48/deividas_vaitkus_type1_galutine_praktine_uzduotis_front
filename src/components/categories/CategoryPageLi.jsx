import { Link } from 'react-router-dom';

export default function CategoryListLi({ item }) {
  return (
    <div>
      <Link to={`/categories/${item.id}`}>
        <div className="flex max-w-4xl bg-white border-gray-200 rounded-lg shadow-lg transition-transform hover:scale-105 hover:-translate-y-1">
          {/* Text content */}
          <span className="text-lg font-semibold text-custom-gray-color hover:text-custom-primary-color tracking-tight">
            {item.name}
          </span>
        </div>
      </Link>
    </div>
  );
}

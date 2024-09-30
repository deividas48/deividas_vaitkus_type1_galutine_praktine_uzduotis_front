import { Link } from 'react-router-dom';
import '../../styles/CategoryListForLiMap.css';

export default function CategoryListForLiMap({ item }) {
  return (
    <div>
      <Link to={`/categories/${item.id}`}>
        <div className="flex max-w-4xl bg-white text-custom-gray-color hover:text-custom-primary-color transition duration-100 ease-in-out">
          {/* Text content */}
          <span className="text-base catText  tracking-tight">{item.name}</span>
        </div>
      </Link>
    </div>
  );
}

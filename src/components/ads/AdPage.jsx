import { Link } from 'react-router-dom';

export default function AdPage({ item }) {
  return (
    <div>
      {/* <ul>
        <li>{item.id}</li>
        <li>{item.title}</li>
        <li>{item.main_image_url}</li>
        <li>{item.description}</li>
        <li>{item.price}</li>
        <li>{item.phone}</li>
        <li>{item.type}</li>
        <li>{item.town_id}</li>
        <li>{item.user_id}</li>
        <li>{item.category_id}</li>
        <li>{item.created_at}</li>
        <li>{item.is_published}</li>
      </ul> */}
      <div className="flex max-w-4xl bg-white border-gray-200 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl">
        {/* Image container */}
        <div className="w-1/3 relative hidden sm:block">
          <img className="sm:none absolute inset-0 w-full h-full object-cover rounded-l-lg" src={`/public/img/sell/${item.main_image_url}`} alt={item.title} />
        </div>
        {/* Text content */}
        <div className="w-2/3 p-4 flex flex-col items-start">
          <div>
            <span className="text-xs uppercase text-custom-primary-color">{item.type}</span>
            <h5 className="mb-2 text-2xl font-bold tracking-tight">{item.title}</h5>
            <p className="text-sm text-custom-gray-color overflow-hidden hidden md:block">
              {item.description.slice(0, 40)}
              {' '}
              ...
            </p>
          </div>
          <div className="md:mt-4">
            <p className="text-sm text-gray-600">{item.phone}</p>
            <p className="text-xl">
              $
              {item.price}
            </p>
          </div>
          <Link to={`/${item.id}`}>
            <span className="text-custom-gray-color hover:text-custom-primary-color font-semibold text-lg md:mt-4">
              Read More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

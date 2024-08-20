// src/components/listings/ListingForLi.jsx

import { Link } from 'react-router-dom';

// #create_listings_list. Component to render a single listing item
export default function ListingForLi({ item }) {
  return (
    <div>
      <div className="flex bg-white border-gray-200 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl">
        {/* 1. #create_listings_list. Render listing image */}
        <div className="w-1/3 relative hidden sm:block">
          <img
            className="sm:none absolute inset-0 w-full h-full object-cover rounded-l-lg"
            src={`/img/sell/${item.skelbimai_main_image_url}`}
            alt={item.skelbimai_title}
          />
        </div>
        {/* 2. #create_listings_list. Render listing text content */}
        <div className="w-2/3 p-4 flex flex-col items-start">
          <div>
            <span className="text-xs uppercase text-custom-primary-color">
              {item.skelbimai_type}
            </span>
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
              {item.skelbimai_title}
            </h5>
            <p className="text-sm text-custom-gray-color overflow-hidden hidden md:block">
              {item.skelbimai_description.slice(0, 40)}
              {' '}
              ...
            </p>
          </div>
          <div className="md:mt-4">
            <p className="text-sm text-gray-600">{item.skelbimai_phone}</p>
            <p className="text-xl">
              $
              {item.skelbimai_price}
            </p>
          </div>
          {/* 3. #create_listings_list. Link to listing detail page */}
          <Link to={`/skelbimas/${item.skelbimai_id}`}>
            <span className="text-custom-gray-color hover:text-custom-primary-color font-semibold text-lg md:mt-4">
              Read More
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

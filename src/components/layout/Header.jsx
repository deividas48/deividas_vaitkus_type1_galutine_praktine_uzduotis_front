import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/Header.css';

// function closeMenu() {
//   setIsMenuOpen(false);
// }

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900">
      {/* Container */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img
            src="../../../public/img/ShopLogo.png"
            alt="EveryShop logo"
            className="w-20"
          />
        </Link>
        <nav className="items-center justify-between hidden w-full sm:flex sm:w-auto">
          <ul className="flex pl-2">
            <li className="nav-list .nav-list:hover">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-list .nav-list:hover">
              <NavLink to="/towns">Towns</NavLink>
            </li>
            <li className="nav-list .nav-list:hover">
              <NavLink to="/towns">Towns</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink
          to="/skelbimas/sukurti"
          className="bg-red-500 hover:bg-red-700 text-white rounded-full hover-bg-gradient relative z-10 font-black flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <span className="inline-grid rounded-full bg-red-500 duration-500 rotate-180 text-2xl">
              <i
                className="bi bi-plus-lg py-2 px-4"
              />
            </span>
          ) : (
            <span className="inline-grid rounded-full bg-red-700 text-2xl">
              <i
                className="bi bi-plus-lg py-2 px-4 rounded-full"
              />
            </span>
          )}
          <span className="ml-2 mr-2">Add Listing</span>
        </NavLink>

        <div className="sm:hidden">
          <button // Button to toggle the menu
            type="button" // Specify the button type just for good practice
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn"
            aria-label="Toggle menu" // Specify the label just for screen readers
          >
            <i
              className={`bi bi-${isMenuOpen ? 'list-nested' : 'list'} fs-3`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/Header.css';
import cl from 'classnames';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Navigacijos(meniu) elementai
  const mySnippet = (
    <>
      <li className="nav-list">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/towns">Towns</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/towns">Towns</NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900 container-workaround header-apatinė-linija">
      {/* Įmonės logo */}
      <div className="container flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/">
          <img
            src="../../../public/img/ShopLogo.png"
            alt="EveryShop logo"
            className="w-20 flex rounded-lg duration-500 ease-in-out hover:shadow-2xl"
          />
        </Link>
        {/* Navigacija */}
        {/* Navigacija. Kai ekranas didelis */}
        <nav>
          <div className="uždarytas-meniu items-center justify-between w-full hidden md:flex md:w-auto relative">
            <ul className="flex pl-2 flex-row nav-meniu-didelis">
              {mySnippet}
            </ul>
          </div>
          {/* Navigacija. Kai ekranas yra mažas ir yra paspaustas mygtukas */}
          {
  isMenuOpen
    ? (
      <div className="atidarytas-meniu bg-white absolute mt-11 left-0 md:hidden w-full z-10">
        <div className="container uždarytas-meniu items-center justify-between w-full md:w-auto relative">
          <ul className={cl('flex pl-2 nav-meniu-mažas nav-meniu-mažas-ul', {
            'flex-col': isMenuOpen, // This will be `flex-col` when the menu is not open
            'flex-row': !isMenuOpen, // This will be `flex-row` when the menu is open
          })}
          >
            {mySnippet}
          </ul>
        </div>
      </div>
    )
    : (
      <div />
    )
}
        </nav>

        {/* Rožinis animuotas mygtukas vedantis į skelbimų įkėlimo puslapį */}
        <NavLink
          to="/skelbimas/sukurti"
          className="bg-red-500 hover:bg-red-700 text-white rounded-full hover-bg-gradient relative z-10 font-black flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <span className="inline-grid rounded-full bg-red-500 duration-500 rotate-180 text-2xl">
              <i className="bi bi-plus-lg py-2 px-4" />
            </span>
          ) : (
            <span className="inline-grid rounded-full bg-red-700 text-2xl">
              <i className="bi bi-plus-lg py-2 px-4 rounded-full" />
            </span>
          )}
          <span className="ml-2 mr-2 hidden sm:block">Add Listing</span>
        </NavLink>

        {/* Navigacijos (meniu) paleidimo mygtukas */}
        <div className="md:hidden">
          <button // Button to toggle the menu
            type="button" // Specify the button type just for good practice
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="btn"
            aria-label="Toggle menu"
          >
            <i className={`bi bi-${isMenuOpen ? 'list-nested' : 'list'} fs-3`} />
          </button>
        </div>
      </div>
    </header>
  );
}

// src/components/layout/Header.jsx

import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/Header.css';
import cl from 'classnames';
import AddBtn from '../buttons/AddBtn';
import TopBar from './TopBar';
import { AuthContext } from '../context/authContext';
import BtnLogIn from '../buttons/BtnLogIn';
import BtnPageUsrSet from '../buttons/BtnPageUsrSet';
import SearchInput from '../search/SearchInput';
import { useSearch } from '../context/SearchContext'; // Import the search context

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { setSearchTerm } = useSearch(); // Access the setSearchTerm function from the context

  // Navigation items
  const authLinks = (
    <>
      <li className="">
        <NavLink to="/">
          <div className="w-full h-full flex items-center">Home</div>
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/skelbimas/sukurti">
          <div className="w-full h-full flex items-center">Add Listing</div>
        </NavLink>
      </li>
      <li className="">
        <div className="w-full h-full flex items-center">
          <button
            className="w-full h-full flex items-center"
            type="button"
            aria-label="Logout"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="">
        <NavLink to="/">
          <div className="w-full h-full flex items-center">Home</div>
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/login">
          <div className="w-full h-full flex items-center">Login</div>
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/skelbimas/sukurti">
          <div className="w-full h-full flex items-center">Add Listing</div>
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/register">
          <div className="w-full h-full flex items-center">Register</div>
        </NavLink>
      </li>
    </>
  );

  const guestBtnLogIn = (
    <li className="mr-4 h-full flex md:block">
      {/* Mygtukas vedantis į prisijungimo puslapį */}
      <BtnLogIn className="items-center justify-center self-center place-items-center ml-auto text-center" />
    </li>
  );

  const authBtnLogIn = (
    <li className="mr-4 h-full flex md:block">
      {/* Mygtukas vedantis į asmeninių skelbimų puslapį */}
      <BtnPageUsrSet className="items-center justify-center self-center place-items-center ml-auto text-center" />
    </li>
  );

  return (
    <>
      {/* Kontaktai */}
      <TopBar />
      <header
        className="bg-white container-workaround
    header-apatinė-linija height-forSmoothness flex items-center"
      >
        <div className="container flex items-center justify-between mx-auto p-0">
          {/* Įmonės logo */}
          <h1 className="min">
            <Link
              to="/"
              className="logo-container"
              aria-label="Home" // Screen reader-friendly text
              title="Home" // Tooltip text
            >
              {/* Logo of company */}
              <img
                src="/img/ShopLogo.png"
                alt="EveryShop logo"
                className="logoo sm:ml-4 logoo-size-sm"
              />
            </Link>
          </h1>
          <div className="flex-grow md:mx-4">
            {/* Use the setSearchTerm function in SearchInput */}
            <SearchInput onSearch={setSearchTerm} />
          </div>
          {/* Navigacija */}
          {/* Navigacija. Kai ekranas didelis */}
          <nav className="flex items-center justify-center">
            <div className="uždarytas-meniu items-center justify-between w-full hidden relative">
              {/* Hidden meniu, because there is to much elements in the header */}
              <ul className="flex pl-2 flex-row nav-meniu-didelis ">
                {isAuthenticated ? authLinks : guestLinks}
              </ul>
            </div>
            {/* Navigacija. Kai ekranas yra mažas ir yra paspaustas mygtukas */}
            {isMenuOpen ? (
              <div className="atidarytas-meniu absolute top-full left-0 w-full z-10">
                <div className="items-center justify-between w-full relative">
                  <ul
                    className={cl('flex nav-meniu-mažas nav-meniu-mažas-ul', {
                      'flex-col': isMenuOpen, // This will be `flex-col` when the menu is not open
                      'flex-row': !isMenuOpen, // This will be `flex-row` when the menu is open
                    })}
                  >
                    {isAuthenticated ? authLinks : guestLinks}
                  </ul>
                </div>
              </div>
            ) : (
              <div />
            )}
          </nav>

          <ul className="flex">
            {isAuthenticated ? authBtnLogIn : guestBtnLogIn}
            {/* Add btn */}
            <li className="mr-4 hidden md:block">
              {/* Rožinis animuotas mygtukas vedantis į skelbimų įkėlimo puslapį */}
              <AddBtn className="mr-4" />
            </li>
          </ul>

          {/* Navigacijos (meniu) paleidimo mygtukas */}
          <div className="sm:mr-4 toggle-m-onlySm">
            <button // Button to toggle the menu
              type="button" // Specify the button type just for good practice
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn"
              aria-label="Toggle menu"
              title="Toggle menu"
            >
              {/* Icon to toggle the menu */}
              <i
                className={`bi bi-${
                  isMenuOpen ? 'list-nested' : 'list'
                } fs-3 text-5xl duration-300 ease-in-out hover:text-custom-color-secondary`}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

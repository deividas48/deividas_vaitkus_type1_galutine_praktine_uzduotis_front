import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../styles/Header.css';
import cl from 'classnames';
import AddBtn from '../buttons/AddBtn';
import TopBar from './TopBar';
import { AuthContext } from '../context/authContext';
import BtnLogIn from '../buttons/BtnLogIn';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Navigation items
  const authLinks = (
    <>
      <li className="nav-list">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/towns">Towns</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/skelbimas/sukurti">Add Listing</NavLink>
      </li>
      <li className="nav-list">
        <button type="button" onClick={logout}>
          Logout
        </button>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-list">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/towns">Towns</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="nav-list">
        <NavLink to="/register">Register</NavLink>
      </li>
    </>
  );

  const guestBtnLogIn = (
    <li className="mr-4 h-full flex">
      {/* Mygtukas vedantis į prisijungimo puslapį */}
      <BtnLogIn className="items-center justify-center self-center place-items-center ml-auto text-center" />
    </li>
  );

  const authBtnLogIn = (
    <li className="mr-4 h-full flex">
      {/* Mygtukas vedantis į asmeninių skelbimų puslapį */}
    </li>
  );

  return (
    <>
      {/* Kontaktai */}
      <TopBar />
      <header
        className="bg-white container-workaround
    header-apatinė-linija height-forSmoothness"
      >
        <div className="container flex flex-wrap items-center justify-between mx-auto p-0">
          {/* Įmonės logo */}
          <h1>
            <Link to="/" className="logo-container">
              {/* Logo of company */}
              <img
                src="/img/ShopLogo.png"
                alt="EveryShop logo"
                className="logoo ml-4"
              />
            </Link>
          </h1>
          {/* Navigacija */}
          {/* Navigacija. Kai ekranas didelis */}
          <nav>
            <div className="uždarytas-meniu items-center justify-between w-full hidden md:flex md:w-auto relative">
              <ul className="flex pl-2 flex-row nav-meniu-didelis">
                {isAuthenticated ? authLinks : guestLinks}
              </ul>
            </div>
            {/* Navigacija. Kai ekranas yra mažas ir yra paspaustas mygtukas */}
            {isMenuOpen ? (
              <div className="atidarytas-meniu absolute top-full left-0 md:hidden w-full z-10">
                <div className="items-center justify-between w-full md:w-auto relative">
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
            <li className="mr-4">
              {/* Rožinis animuotas mygtukas vedantis į skelbimų įkėlimo puslapį */}
              <AddBtn className="mr-4" />
            </li>
          </ul>

          {/* Navigacijos (meniu) paleidimo mygtukas */}
          <div className="md:hidden mr-4">
            <button // Button to toggle the menu
              type="button" // Specify the button type just for good practice
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn"
              aria-label="Toggle menu"
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

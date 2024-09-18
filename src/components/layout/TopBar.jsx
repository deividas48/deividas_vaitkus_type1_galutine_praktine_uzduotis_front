import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function TopBar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  // Navigation items
  const authLinks = (
    <>
      <ul className="flex gap-1 items-center">
        <li className="hidden md:block">
          <p>Follow Us On:</p>
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-facebook hover-slow-blue-text px-2 py-2"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-twitter-x hover-slow-white-text px-2 py-2 hidden md:block"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-linkedin hover-slow-blue-text px-2 py-2 hidden md:block"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-instagram hover-slow-red-text px-2 py-2 hidden md:block"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-pinterest hover-slow-red-text px-2 py-2 hidden md:block"
          />
        </li>
      </ul>
      <ul className="flex items-center gap-0 md:gap-1">
        {/* <li className="flex items-center">
          <i className="bi bi-telephone icons" />
          <Link to="/" className="hover-slow-red-text">
            Call Us: (+123)590333
          </Link>
          <i className="bi bi-dot text-2xl text-gray-500" />
        </li>
        <li className="flex items-center">
          <i className="bi bi-envelope icons" />
          <Link to="/" className="hover-slow-red-text">
            Email: info@gmail.com
          </Link>
        </li> */}
        <li>
          <Link
            to="/skelbimas/sukurti"
            className="bi bi-plus-circle hover-slow-white-text px-3 py-2"
          />
        </li>
        <li>
          <Link
            to="/userSettings"
            className="bi bi-gear hover-slow-white-text px-3 py-2"
          />
        </li>
        <li>
          <button
            className="bi bi-box-arrow-right hover-slow-white-text px-3 py-2"
            type="button"
            aria-label="Logout"
            onClick={logout}
          />
        </li>
      </ul>
    </>
  );

  const guestLinks = (
    <>
      <ul className="flex items-center gap-1">
        <li className="hidden md:block">
          <p>Follow Us On:</p>
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-facebook hover-slow-blue-text px-2 py-2"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-twitter-x hover-slow-white-text px-2 py-2 hidden md:block"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-linkedin hover-slow-blue-text px-2 py-2 hidden md:block"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-instagram hover-slow-red-text px-2 py-2 hidden md:block"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-pinterest hover-slow-red-text px-2 py-2 hidden md:block"
          />
        </li>
      </ul>
      <ul className="flex items-center gap-0 md:gap-1">
        {/* <li className="flex items-center">
          <i className="bi bi-telephone icons" />
          <Link to="/" className="hover-slow-red-text">
            Call Us: (+123)590333
          </Link>
          <i className="bi bi-dot text-2xl text-gray-500" />
        </li>
        <li className="flex items-center">
          <i className="bi bi-envelope icons" />
          <Link to="/" className="hover-slow-red-text">
            Email: info@gmail.com
          </Link>
        </li> */}
        <li>
          <Link
            to="/skelbimas/sukurti"
            className="bi bi-plus-circle hover-slow-white-text px-3 py-2"
          />
        </li>
        <li>
          <Link
            to="/register"
            className="bi bi-person-add hover-slow-white-text px-3 py-2"
          >
            <span className="pl-1">Sign in</span>
          </Link>
        </li>
        <li>
          <Link
            to="/login"
            className="bi bi-door-open hover-slow-white-text px-3 py-2"
          >
            <span className="pl-1">Log in</span>
          </Link>
        </li>
      </ul>
    </>
  );
  return (
    <div className="bg-black container-workaround text-custom-color-grey2 text-base aukštis-info flex items-center">
      <div className="container flex justify-between">
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    </div>
  );
}

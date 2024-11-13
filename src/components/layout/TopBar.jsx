import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function TopBar() {
  const { isAuthenticated, logout, userDetails } = useContext(AuthContext);

  function trimName(name) {
    if (name.length > 12) {
      return `${name.substring(0, 12)}...`;
    }
    return name;
  }

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
            aria-label="Facebook" // Screen reader-friendly text
            title="Facebook" // Tooltip text
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-twitter-x hover-slow-white-text px-2 py-2 hidden md:block"
            aria-label="Facterder-friendly text"
            title="Twitter"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-linkedin hover-slow-blue-text px-2 py-2 hidden md:block"
            aria-label="LinkedIn"
            title="LinkedIn"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-instagram hover-slow-red-text px-2 py-2 hidden md:block"
            aria-label="Instagram"
            title="Instagram"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-pinterest hover-slow-red-text px-2 py-2 hidden md:block"
            aria-label="Pinterest"
            title="Pinterest"
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
          {userDetails && userDetails.id ? (
            <Link
              to={`/user/${userDetails.id}`}
              className="bi bi-person-lines-fill hover-slow-white-text px-3 py-2"
              aria-label="User listings"
              title="User listings"
            />
          ) : (
            <p>Loading...</p> // You can also replace this with a skeleton loader or a placeholder link
          )}
        </li>
        <li>
          <Link
            to="/skelbimas/sukurti"
            className="bi bi-plus-circle hover-slow-white-text px-3 py-2"
            aria-label="Create a listing" // Screen reader-friendly text
            title="Create a listing" // Tooltip text
          />
        </li>
        <li>
          <Link
            to="/userSettings"
            className="bi bi-gear hover-slow-white-text px-3 py-2"
            aria-label="User settings" // Screen reader-friendly text
            title="User settings" // Tooltip text
          />
        </li>
        <li>
          <Link
            to="/userSettings"
            className="hover-slow-white-text px-3 py-2"
            aria-label="User settings" // Screen reader-friendly text
            title="User settings" // Tooltip text
          >
            <span className="text-xs md:text-base">Hi </span>
            <span className="text-xs md:text-base">
              {userDetails && userDetails.name
                ? trimName(userDetails.name)
                : 'Guest'}
            </span>
            {/* <span
              className="bi bi-dot -mr-4 text-green-500"
              aria-label="Signed in" // Screen reader-friendly text
              title="Signed in" // Tooltip text
            /> */}
            <span>!</span>
          </Link>
        </li>
        <li>
          <button
            className="bi bi-box-arrow-right hover-slow-white-text px-3 py-2"
            type="button"
            aria-label="Logout"
            title="Logout" // Tooltip text
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
            aria-label="Facebook" // Screen reader-friendly text
            title="Facebook" // Tooltip text
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-twitter-x hover-slow-white-text px-2 py-2 hidden md:block"
            aria-label="Twitter"
            title="Twitter"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-linkedin hover-slow-blue-text px-2 py-2 hidden md:block"
            aria-label="LinkedIn"
            title="LinkedIn"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-instagram hover-slow-red-text px-2 py-2 hidden md:block"
            aria-label="Instagram"
            title="Instagram"
          />
        </li>
        <li>
          <Link
            to="/"
            className="bi bi-pinterest hover-slow-red-text px-2 py-2 hidden md:block"
            aria-label="Pinterest"
            title="Pinterest"
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
            aria-label="Create a listing" // Screen reader-friendly text
            title="Create a listing" // Tooltip text
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

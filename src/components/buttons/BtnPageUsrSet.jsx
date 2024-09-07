// src/components/buttons/BtnPageUsrSet.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Header.css';

export default function BtnPageUsrSet() {
  const [isHovered, setIsHovered] = useState(false);

  const btnLogIn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-person-lines-fill"
      viewBox="0 0 16 16"
    >
      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
    </svg>
  );

  return (
    <NavLink
      to="/userSettings"
      className="text-white rounded-full relative z-10 font-black flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <span className="inline-grid rounded-full bg-custom-primary-color duration-500 ease-out border border-custom-primary-color">
          <div className="header-įdėti-button2">{btnLogIn}</div>
        </span>
      ) : (
        <span className="inline-grid rounded-full bg-transparent text-xl font-black duration-500 ease-out border text-custom-gray-color border-custom-gray-color">
          <div className="header-įdėti-button2">{btnLogIn}</div>
        </span>
      )}
    </NavLink>
  );
}

// src/components/buttons/BtnLogIn.jsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Header.css';

export default function BtnLogIn() {
  const [isHovered, setIsHovered] = useState(false);

  const btnLogIn = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="bi bi-person"
      viewBox="0 0 16 16"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
    </svg>
  );

  return (
    <NavLink
      to="/login"
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

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Header.css';

export default function AddBtn() {
  const [isHovered, setIsHovered] = useState(false);

  const btnSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20" // Set width to 20px
      height="20" // Set height to 20px
      fill="currentColor"
      className="bi bi-plus-lg"
      viewBox="0 0 16 16"
      style={{ fontWeight: 900 }}
    >
      <path
        fillRule="evenodd"
        d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
        strokeWidth="1" // Increase this value to make the lines appear "bolder"
        stroke="currentColor"
      />
    </svg>
  );

  return (
    <NavLink
      to="/skelbimas/sukurti"
      className="text-white rounded-full hover-bg-gradient relative z-10 font-black flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <span className="inline-grid rounded-full bg-custom-primary-color duration-500 rotate-180">
          <div className="header-įdėti-button2">{btnSvg}</div>
        </span>
      ) : (
        <span className="inline-grid rounded-full duration-500 ease-out bg-custom-color-secondary text-xl font-black">
          <div className="header-įdėti-button2">{btnSvg}</div>
        </span>
      )}
      <span className="ml-3 header-įdėti-button-pavadinimas hidden md:block">
        Add Listing
      </span>
    </NavLink>
  );
}

import { NavLink } from 'react-router-dom';
import '../../styles/Header.css';

export default function DeleteBtn() {
  return (
    <NavLink
      to="/skelbimas/sukurti"
      className="text-white rounded-full hover-bg-gradient relative z-10 font-black flex items-center justify-center p-2"
    >
      <span className="ml-3 header-įdėti-button-pavadinimas">Delete ad</span>
    </NavLink>
  );
}

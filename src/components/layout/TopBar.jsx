import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="bg-black container-workaround text-custom-color-grey2 text-sm aukštis-info flex items-center">
      <div className="container flex justify-center lg:justify-between">
        <ul className="flex items-center">
          <li className="flex items-center">
            <i className="bi bi-telephone icons" />
            <Link to="/" className="hover-slow-red-text">Call Us: (+123)590333</Link>
            <i className="bi bi-dot text-2xl text-gray-500" />
          </li>
          <li className="flex items-center">
            <i className="bi bi-envelope icons" />
            <Link to="/" className="hover-slow-red-text">Email : info@gmail.com</Link>
          </li>
        </ul>
        <ul className="hidden lg:flex gap-4 items-center">
          <li>
            <i className="bi bi-bezier2" />
          </li>
          <li>
            <p>Follow Us On:</p>
          </li>
          <li>
            <Link to="/" className="bi bi-facebook hover-slow-blue-text" />
          </li>
          <li>
            <Link to="/" className="bi bi-twitter-x hover-slow-blue-text" />
          </li>
          <li>
            <Link to="/" className="bi bi-linkedin hover-slow-blue-text" />
          </li>
          <li>
            <Link to="/" className="bi bi-instagram hover-slow-red-text" />
          </li>
          <li>
            <Link to="/" className="bi bi-pinterest hover-slow-red-text" />
          </li>
        </ul>
      </div>
    </div>
  );
}

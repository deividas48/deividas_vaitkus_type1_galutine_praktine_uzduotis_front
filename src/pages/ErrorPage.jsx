import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="">
      <div className="flex flex-col justify-center bg-white m-4 p-4 rounded-lg">
        <h1>404 - Not Found!</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>
          <span>Back to the </span>
          <Link className="text-custom-primary-color" to="/">Home Page</Link>
        </p>
      </div>
    </div>
  );
}

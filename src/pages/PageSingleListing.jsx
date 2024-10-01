// src\pages\PageSingleListing.jsx

/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AdImgCarousel from '../components/UI/AdImgCarousel';
import DeleteBtn from '../components/buttons/DeleteBtn';
// import AdImgSwiper from '../components/UI/AdImgSwiper';

export default function SingleAdPage() {
  // From App.jsx parameter <Route path="/skelbimas/:id"...
  const { id } = useParams();

  const [ad, setAd] = useState(null); // Where data is feched from API (server)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Gauti po vieną skelbimą iš serverio

  // This function will fetch the ad from the server
  async function getPosts(url) {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      // console.log(resp.data);
      setAd(resp.data[0]);
    } catch (error) {
      // console.warn('getTrip', error);
      setIsError(true);
    }
    setIsLoading(false);
  }
  // console.log('Fetched ad title:', resp.data.title);
  // console.log('Fetched ad title:', resp.data);

  const cUrl = `http://localhost:3000/api/listings/${id}`;
  useEffect(() => {
    getPosts(cUrl);
  }, [id]);

  // Dar ir trynimas pridedamas čia

  const navigate = useNavigate();

  async function handleDeleteTrip() {
    try {
      // const resp =
      await axios.delete(cUrl);
      // console.log('resp ===', resp);
      navigate('/'); // Redirect to the home page
      // Display a success message
      toast.success(
        `${ad.title[0].toUpperCase() + ad.title.slice(1)} was deleted`,
        {
          duration: 8000,
        },
      );
    } catch (error) {
      // console.warn('axiosErr.response.data ===', error.response?.data);
      // console.warn('Delete error');
      toast.error('Failed to delete ad.'); // Display an error toast
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch the ad</p>;
  if (!ad) return <p>No ad data!</p>; // Check if ad is null

  return (
    <div className="md:flex min-h-screen">
      <main className="md:w-3/4">
        {/* Listed item to sell */}
        <section className="mb-4 bg-white p-4 md:mr-4 mt-4 rounded-lg">
          <span className="text-xs uppercase text-custom-primary-color">
            {ad.type}
          </span>
          {/* Ad img */}
          <AdImgCarousel
            images={[
              ad.main_image_url ? ad.main_image_url : 'sellDefault.png',
              ad.list_image_url_9,
              ad.list_image_url_8,
              ad.list_image_url_7,
              ad.list_image_url_6,
              ad.list_image_url_5,
              ad.list_image_url_4,
              ad.list_image_url_3,
              ad.list_image_url_1,
              ad.list_image_url_2,
            ].filter(Boolean)} // This will remove all falsy values from the array
          />
        </section>

        <section className="mb-4 mt-4 bg-white p-4 md:mr-4 rounded-lg">
          {/* Description */}
          <h2 className="text-xl font-semibold pb-2">{ad.title}</h2>
          {ad.description}
          <p className="text-custom-primary-color mt-1 justify-end flex ">
            Price: ${ad.price}
          </p>
        </section>
      </main>
      <aside className="md:w-1/4">
        <section className=" bg-white p-4 mb-4 mt-4 rounded-lg">
          <h2 className="cssTitle3 text-xl font-medium pb-3">Personal info</h2>
          {/* User photo */}
          <section className="flex mb-3">
            <div className="w-20 min-w-20 h-20 min-h-20 bg-black rounded-full mr-3 mb-3 border-2 border-white">
              {ad.user_photo ? (
                <Link
                  to={`/user/${ad.user_id}`}
                  className="hover-fast-red-text"
                  aria-label="User profile" // Screen reader-friendly text
                  title="User profile" // Tooltip text
                >
                  <img
                    className="object-contain w-full h-full rounded-full"
                    style={{
                      maskImage:
                        'radial-gradient(circle, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 80%)',
                    }}
                    src={`/img/userPhoto/${ad.user_photo}`}
                    alt={ad.skelbimai_title}
                  />
                </Link>
              ) : (
                <Link
                  to={`/user/${ad.user_id}`}
                  className="hover-fast-red-text"
                  aria-label="User profile" // Screen reader-friendly text
                  title="User profile" // Tooltip text
                >
                  <img
                    className="object-contain w-full h-full rounded-full"
                    style={{
                      maskImage:
                        'radial-gradient(circle, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 80%)',
                    }}
                    src={'/img/userPhoto/default.png'}
                    alt="anonym"
                  />
                </Link>
              )}
            </div>
            <p className="flex flex-col mt-3 mb-3">
              <span className="text-lg font-semibold">
                <Link
                  to={`/user/${ad.user_id}`}
                  className="hover-fast-red-text"
                  aria-label="User profile" // Screen reader-friendly text
                  title="User profile" // Tooltip text
                >
                  {ad.user_name}
                </Link>
              </span>
              {/* Log in status or something */}
              <span className="text-sm text-custom-gray-color font-semibold hidden">
                {ad.user_name}
              </span>
            </p>
          </section>
          <p className="flex flex-col mb-4">
            <span className="flex my-1.5">
              <i className="bi bi-telephone text-custom-primary-color" />
              <div className="ml-1.5 text-custom-gray-color">
                {ad.phone ? ad.phone : ' - '}
              </div>
            </span>
            <span className="flex my-1.5">
              <i className="bi bi-envelope-at text-custom-primary-color" />
              <div className="ml-1.5 text-custom-gray-color">
                {ad.user_email ? ad.user_email : ' - '}
              </div>
            </span>
            <span className="flex my-1.5">
              <i className="bi bi-geo-alt text-custom-primary-color" />
              <div className="ml-1.5 text-custom-gray-color">
                {ad.miestai_name ? ad.miestai_name : ' - '}
              </div>
            </span>
          </p>
        </section>
        <section className=" bg-white p-4 rounded-lg">
          <h2 className="text-xl font-semibold pb-2">Settings</h2>
          <div className="flex justify-center">
            <button onClick={handleDeleteTrip} type="button">
              <DeleteBtn />
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}

// src\components\listings\PageUser\PageUserUser.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';

export default function PageUserUser() {
  const { userID } = useParams();

  const [userFrom, setUserFrom] = useState(null); // Where data is feched from API (server)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Gauti po vieną skelbimą iš serverio

  // This function will fetch the user from the server
  async function getPosts(url) {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      // console.log('1', resp.data[0]);
      setUserFrom(resp.data[0]);
    } catch (error) {
      // console.warn('getTrip', error);
      setIsError(true);
    }
    setIsLoading(false);
  }
  // console.log('Fetched userFrom title:', resp.data.title);
  // console.log('Fetched userFrom title:', resp.data);

  const cUrl = `http://localhost:3000/api/users/${userID}`;
  useEffect(() => {
    getPosts(cUrl);
  }, [userID]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch user data</p>;
  if (!userFrom) return <p>No user data!</p>; // Check if userFrom is null

  return (
    <>
      <h2 className="cssTitle3 text-xl font-medium pb-3">Personal info</h2>
      {/* User photo */}
      <section className="flex mb-3 min-w-56">
        <div className="w-24 min-w-24 h-24 min-h-24 bg-black rounded-full mr-8 mb-3 border-2 border-white">
          {userFrom.avatar_url ? (
            <img
              className="object-contain w-full h-full rounded-full"
              style={{
                maskImage:
                  'radial-gradient(circle, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 80%)',
              }}
              src={`/img/userPhoto/${userFrom.avatar_url}`}
              alt={userFrom.name}
            />
          ) : (
            <img
              className="object-contain w-full h-full rounded-full"
              style={{
                maskImage:
                  'radial-gradient(circle, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 80%)',
              }}
              src={'/img/userPhoto/default.png'}
              alt="anonym"
            />
          )}
        </div>
        <p className="">
          <span className="text-3xl font-semibold">{userFrom.name}</span>
          {/* Log in status or something */}
          <span className="text-sm text-custom-gray-color font-semibold hidden">
            {userFrom.name}
          </span>
          <span className="h-full w-full grid place-items-end">
            <span className="mb-4 w-full items-end flex flex-wrap gap-x-4">
              <span className="flex my-1.5">
                <i className="bi bi-telephone text-custom-primary-color" />
                <span className="ml-1.5 text-custom-gray-color">
                  {userFrom.user_phone ? userFrom.user_phone : ' - '}
                </span>
              </span>
              <span className="flex my-1.5">
                <i className="bi bi-envelope-at text-custom-primary-color" />
                <span className="ml-1.5 text-custom-gray-color">
                  {userFrom.email ? userFrom.email : ' - '}
                </span>
              </span>
              <span className="flex my-1.5">
                <i className="bi bi-geo-alt text-custom-primary-color" />
                <span className="ml-1.5 text-custom-gray-color">
                  {userFrom.user_city ? userFrom.user_city : ' - '}
                </span>
              </span>
            </span>
          </span>
        </p>
      </section>
    </>
  );
}

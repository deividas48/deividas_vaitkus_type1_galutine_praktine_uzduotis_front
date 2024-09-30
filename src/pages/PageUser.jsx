// src\pages\PageUser.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageUserUser from '../components/listings/PageUser/PageUserUser';
import PageUserListings from '../components/listings/PageUser/PageUserListings';
// import toast from 'react-hot-toast';

export default function PageUser() {
  const { userID } = useParams();

  const [listing, setListing] = useState(null); // Where data is feched from API (server)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Gauti po vieną skelbimą iš serverio

  // This function will fetch the listing from the server
  async function getPosts(url) {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      // console.log(resp.data);
      setListing(resp.data[0]);
    } catch (error) {
      // console.warn('getTrip', error);
      setIsError(true);
    }
    setIsLoading(false);
  }
  // console.log('Fetched listing title:', resp.data.title);
  // console.log('Fetched listing title:', resp.data);

  const cUrl = `http://localhost:3000/api/users/${userID}`;
  useEffect(() => {
    getPosts(cUrl);
  }, [userID]);

  // Dar ir trynimas pridedamas čia

  // const navigate = useNavigate();

  // async function handleDeleteTrip() {
  //   try {
  //     // const resp =
  //     await axios.delete(cUrl);
  //     // console.log('resp ===', resp);
  //     navigate('/'); // Redirect to the home page
  //     // Display a success message
  //     toast.success(
  //       `${listing.title[0].toUpperCase() + listing.title.slice(1)} was deleted`,
  //       {
  //         duration: 8000,
  //       },
  //     );
  //   } catch (error) {
  //     // console.warn('axiosErr.response.data ===', error.response?.data);
  //     // console.warn('Delete error');
  //     toast.error('Failed to delete listing.'); // Display an error toast
  //   }
  // }

  if (isLoading)
    return <p className="bg-white p-4 mb-4 mt-4 rounded-lg">Loading...</p>;
  if (isError)
    return (
      <p className="bg-white p-4 mb-4 mt-4 rounded-lg">
        Failed to fetch the user listings
      </p>
    );
  if (!listing)
    return (
      <p className="bg-white p-4 mb-4 mt-4 rounded-lg">No listing data!</p>
    ); // Check if listing is null

  return (
    <>
      <section className="bg-white p-4 mb-4 mt-4 rounded-lg">
        <PageUserUser />
      </section>
      <PageUserListings />
    </>
  );
}

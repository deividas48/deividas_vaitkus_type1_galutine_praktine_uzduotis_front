// src\pages\PageUser.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Hero from '../components/hero/Hero';
// import toast from 'react-hot-toast';

export default function PageUser() {
  const { userID } = useParams();

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

  const cUrl = `http://localhost:3000/api/listings/byUser/${userID}`;
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
  //       `${ad.title[0].toUpperCase() + ad.title.slice(1)} was deleted`,
  //       {
  //         duration: 8000,
  //       },
  //     );
  //   } catch (error) {
  //     // console.warn('axiosErr.response.data ===', error.response?.data);
  //     // console.warn('Delete error');
  //     toast.error('Failed to delete ad.'); // Display an error toast
  //   }
  // }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch the user listings</p>;
  if (!ad) return <p>No listing data!</p>; // Check if ad is null

  return (
    <>
      {' '}
      <Hero />
      gay{ad.title}
    </>
  );
}

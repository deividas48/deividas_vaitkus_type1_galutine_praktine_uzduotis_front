// src\components\listings\PageUser\PageUserListings.jsx

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListingsList from '../ListingsList';
// import toast from 'react-hot-toast';

export default function PageUserListings() {
  const { userID } = useParams();

  const [data, setData] = useState([]); // Where data is feched from API (server)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Gauti po vieną skelbimą iš serverio

  // Fetch the user listings from the server
  async function getPosts(url) {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      console.log(resp.data);
      setData(resp.data || []);
    } catch (error) {
      // console.warn('getTrip', error);
      setIsError(true);
    }
    setIsLoading(false);
  }
  // console.log('Fetched data title:', resp.data.title);
  // console.log('Fetched data title:', resp.data);

  const cUrl = `http://localhost:3000/api/listings/byUser/${userID}`;
  useEffect(() => {
    getPosts(cUrl);
  }, [userID]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to fetch user data</p>;
  if (!data.length) return <p>No user listings found!</p>; // Check if data array is empty

  return (
    <>
      <ListingsList list={data} />
    </>
  );
}

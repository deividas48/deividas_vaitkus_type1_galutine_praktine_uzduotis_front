/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import TownsList from '../components/towns/TownsList';
import { baseUrl } from '../config/config';

function PageTowns() {
  const [townsArr, settownsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        settownsArr(resp.data);
      })
      .catch((error) => {
        console.warn('Error fetching towns:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPosts(`${baseUrl}/api/towns`);
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch towns</p>}
      {!isLoading && !isError && <TownsList list={townsArr} />}
    </div>
  );
}

export default PageTowns;

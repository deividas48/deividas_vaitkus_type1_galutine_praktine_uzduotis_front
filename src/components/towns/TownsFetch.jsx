/* eslint-disable no-console */
import axios from 'axios';
import { useState, useEffect } from 'react';
import TownsList from './TownsList';

function TownsFetch() {
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
    getPosts('http://localhost:3000/api/towns');
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch towns</p>}
      {!isLoading && !isError && <TownsList list={townsArr} />}
    </div>
  );
}

export default TownsFetch;

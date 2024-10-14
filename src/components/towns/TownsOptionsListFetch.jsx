/* eslint-disable no-console */
// #townsOptionsInput

import axios from 'axios';
import { useState, useEffect } from 'react';
import { baseUrl } from '../../config/config';

function TownsOptionsListFetch() {
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

  if (isLoading) return <option>Loading...</option>;
  if (isError) return <option>Failed to fetch towns</option>;

  return townsArr.map((town) => (
    <option key={town.id} value={town.name}>
      {town.name}
    </option>
  ));
}

export default TownsOptionsListFetch;

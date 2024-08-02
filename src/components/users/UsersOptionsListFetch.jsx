/* eslint-disable no-console */
// #usersOptionsInput

import axios from 'axios';
import { useState, useEffect } from 'react';

function UsersOptionsListFetch() {
  const [usersArr, setusersArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function getPosts(url) {
    setIsLoading(true);
    axios
      .get(url)
      .then((resp) => {
        setusersArr(resp.data);
      })
      .catch((error) => {
        console.warn('Error fetching users:', error);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getPosts('http://localhost:3000/api/users');
  }, []);

  if (isLoading) return <option>Loading...</option>;
  if (isError) return <option>Failed to fetch users</option>;

  return usersArr.map((user) => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  ));
}

export default UsersOptionsListFetch;

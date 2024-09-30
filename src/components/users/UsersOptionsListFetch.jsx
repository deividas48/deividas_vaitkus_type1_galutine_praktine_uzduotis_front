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

  if (isLoading)
    return (
      <option className="bg-white p-4 mb-4 mt-4 rounded-lg">Loading...</option>
    );
  if (isError)
    return (
      <option className="bg-white p-4 mb-4 mt-4 rounded-lg">
        Failed to fetch users
      </option>
    );

  return usersArr.map((user) => (
    <option key={user.id} value={user.name}>
      {user.name}
    </option>
  ));
}

export default UsersOptionsListFetch;

// src/components/PrivateRoute.jsx
// The file is necessary if you want to restrict certain pages so only logged-in users
// can access them, you can create a PrivateRoute component.
// #onlyLoggedUsers

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

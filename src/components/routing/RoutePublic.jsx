// src/components/RoutePublic.jsx
// The file is necessary if you want to restrict certain pages so only logged-in users
// can access them, you can create a RoutePublic component.
// #onlyLoggedUsers

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function RoutePublic({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    // You can return a loading spinner or null
    return null; // Or <LoadingSpinner />
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

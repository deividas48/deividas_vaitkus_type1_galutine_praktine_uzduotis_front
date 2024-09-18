// src\components\context\authContext.jsx

// Importing necessary React hooks and functions
import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';

// Creating the AuthContext, which will be used to pass down authentication-related values
export const AuthContext = createContext();

// AuthProvider component that wraps around the app and provides authentication context
export function AuthProvider({ children }) {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // State to store user details like name, email, etc.
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  // useEffect to check local storage for token and user details when the app starts
  useEffect(() => {
    // Get the authentication token from local storage (if exists)
    const token = localStorage.getItem('authToken');

    // Get the stored user details as a string from localStorage
    const storedUserDetails = localStorage.getItem('userDetails');

    // Check if the string is valid and not undefined or null, then parse it
    // let userDetails = null;
    if (storedUserDetails && storedUserDetails !== 'undefined') {
      try {
        const parsedUserDetails = JSON.parse(storedUserDetails);

        if (parsedUserDetails) {
          setUserDetails(parsedUserDetails);
        }
      } catch (error) {
        console.error('Error parsing user details:', error);
        localStorage.removeItem('userDetails');
      }
    }

    // Set isAuthenticated to true if there is a token in local storage
    setIsAuthenticated(!!token);

    // Set loading to false after authentication status is determined
    setLoading(false);
  }, []); // This effect runs only once when the component mounts

  // Function to log the user in, storing the token and user details
  const login = (token, user) => {
    // console.log('Token in AuthContext:', token);
    // console.log('User in AuthContext:', user);

    // Store the authentication token in local storage
    localStorage.setItem('authToken', token);

    // Store the user details in local storage as a string
    localStorage.setItem('userDetails', JSON.stringify(user));

    // Set authentication state to true
    setIsAuthenticated(true);

    // Set the user details in the state
    setUserDetails(user);
  };

  // Function to log the user out, removing the token and user details
  const logout = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem('authToken');

    // Remove the user details from local storage
    localStorage.removeItem('userDetails');

    // Set authentication state to false
    setIsAuthenticated(false);

    // Clear the user details from state
    setUserDetails(null);
  };

  // Function to update user details
  const updateUserDetails = (updates) => {
    // Create a new object with updated userDetails
    const updatedDetails = { ...userDetails, ...updates };
    // Update localStorage
    localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
    // Update state
    setUserDetails(updatedDetails);
  };

  // Memoizing the context value to avoid unnecessary re-renders when the values haven't changed
  const contextValue = useMemo(
    () => ({
      isAuthenticated, // Whether the user is logged in or not
      userDetails, // The details of the currently logged-in user
      login, // The function to log the user in
      logout, // The function to log the user out
      updateUserDetails, // Make this function available in the context
      loading, // Include loading in the context
    }),
    [isAuthenticated, userDetails, loading],
  );

  // Providing the AuthContext to children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

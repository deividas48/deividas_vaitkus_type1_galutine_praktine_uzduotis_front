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

  // useEffect to check local storage for token and user details when the app starts
  useEffect(() => {
    // Get the authentication token from local storage (if exists)
    const token = localStorage.getItem('authToken');

    // Get the user details from local storage (if exists) and parse it into a JavaScript object
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Set isAuthenticated to true if there is a token in local storage
    setIsAuthenticated(!!token);

    // If user details exist, store them in state
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []); // This effect runs only once when the component mounts

  // Function to log the user in, storing the token and user details
  const login = (token, user) => {
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

  // Memoizing the context value to avoid unnecessary re-renders when the values haven't changed
  const contextValue = useMemo(
    () => ({
      isAuthenticated, // Whether the user is logged in or not
      userDetails, // The details of the currently logged-in user
      login, // The function to log the user in
      logout, // The function to log the user out
    }),
    [isAuthenticated, userDetails], // Only recompute if these values change
  );

  // Providing the AuthContext to children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

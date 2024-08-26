import React, { createContext, useState, useContext } from 'react';

// Create the SearchContext
const SearchContext = createContext();

// Custom hook to use the SearchContext
export const useSearch = () => useContext(SearchContext);

// Provider component to wrap around your app
export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    // 'SearchContext.Provider'shares'searchTerm','setSearchTerm'to all the files wrapped in App.jsx
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

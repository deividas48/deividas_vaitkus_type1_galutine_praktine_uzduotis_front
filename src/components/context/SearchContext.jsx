import React, {
  createContext, useState, useContext, useMemo,
} from 'react';

// Create the SearchContext
const SearchContext = createContext();

// Custom hook to use the SearchContext
export const useSearch = () => useContext(SearchContext);

// Provider component to wrap around your app
export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm]);

  return (
    // 'SearchContext.Provider'shares'searchTerm','setSearchTerm'to all the files wrapped in App.jsx
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}


import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  // All useState hooks must be called in the same order every time
  const [user, setUser] = useState(null);
 

  // Context value
  const value = {
    user, 
    setUser
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;

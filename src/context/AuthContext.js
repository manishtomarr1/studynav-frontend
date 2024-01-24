import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const setAuth = (token) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const internalLogout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuth, logout: internalLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Standalone logout function
export const logout = () => {
  localStorage.removeItem('authToken');
  // Add any other logout logic you might need
};

export const useAuth = () => useContext(AuthContext);

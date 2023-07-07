import React, { createContext, useState } from "react";

export const AuthoriseContext = createContext();

export const AuthoriseProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const authContextValue = {
    isLoggedIn,
    toggleLoginStatus,
  };

  return (
    <AuthoriseContext.Provider value={authContextValue}>
      {children}
    </AuthoriseContext.Provider>
  );
};

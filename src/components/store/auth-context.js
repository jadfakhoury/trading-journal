import React, { useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [currentUser, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem('currentUser', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

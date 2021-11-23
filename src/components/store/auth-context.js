import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  currentUser: '',
  userToken: '',
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (username, password, rememberMe) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [userToken, setUserToken] = useState();

  useEffect(() => {}, []);

  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
  };

  const loginHandler = (username, password, rememberMe) => {
    localStorage.setItem('currentUser', currentUser);
    localStorage.setItem('userToken', userToken);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser: currentUser,
        userToken: userToken,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

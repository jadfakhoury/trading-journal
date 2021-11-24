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
  const [currentUser, setCurrentUser] = useState('');
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('remember') === 'true') {
      const user = localStorage.getItem('currentUser');
      const jwtToken = localStorage.getItem('userToken');
      if (user && jwtToken) {
        localStorage.setItem('currentUser', user);
        localStorage.setItem('userToken', jwtToken);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('remember');
    setIsLoggedIn(false);
  };

  const loginHandler = (username, password, rememberMe) => {
    const user = username;
    const userJwt = username + 'Token';

    if (rememberMe) {
      localStorage.setItem('currentUser', user);
      localStorage.setItem('userToken', userJwt);
      localStorage.setItem('remember', rememberMe);
    }

    setCurrentUser(user);
    setUserToken(userJwt);
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

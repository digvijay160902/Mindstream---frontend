import React, { createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const authenticateUser = (token, expirationTime) => {
  return token && Date.now() < expirationTime;
};

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');
    const userInfo = JSON.parse(localStorage.getItem('user_detail'));

    if (authenticateUser(token, expirationTime)) {
      setIsLoggedIn(true);
      setUser(userInfo);
    }
  }, []);

  

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user_detail');
    navigate("/Home");
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    logout, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

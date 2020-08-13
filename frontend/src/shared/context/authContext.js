import axios from 'axios';
import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { LocalStorage } from '../api/localStorage';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

let logoutTimer;

export const AuthProvider = ({ children }) => {
  const { getLocale, storeLocale, removeLocale } = LocalStorage;
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const _setTokenToAxios = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

  const login = useCallback((uid, token, expirationDate) => {
    _setTokenToAxios(token);
    setToken(token);
    setUserId(uid);

    const tokenExpirationDate =
      expirationDate ||
      new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    storeLocale('userData', {
      userId: uid,
      token: token,
      expiration: tokenExpirationDate.toISOString(),
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    removeLocale('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = getLocale('userData');

    if (
      storedData?.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
      );
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

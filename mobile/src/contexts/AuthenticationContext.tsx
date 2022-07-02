import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../service/api';
import {
  AuthenticationProviderProps,
  CommonHeaderProperties,
  IAuthenticationContext,
  User,
  Auth,
} from './types';

const AuthenticationContext = createContext({} as IAuthenticationContext);

export function AuthenticationProvider({
  children,
}: AuthenticationProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const authString = await AsyncStorage.getItem('auth');

      if (authString) {
        const auth = JSON.parse(authString) as Auth;

        if (auth.token) {
          api.defaults.headers = {
            Authorization: `Bearer ${auth.token}`,
          } as CommonHeaderProperties;

          setUser(auth.user);
          setToken(auth.token);
          setIsAuthenticated(true);
        }
      }

      setIsLoading(false);
    })();
  }, []);

  async function invalidateAuthentication() {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('auth');
  }

  async function saveAuthentication(auth: Auth) {
    await AsyncStorage.setItem(
      'auth',
      JSON.stringify({ user: auth.user, token: auth.token }),
    );

    api.defaults.headers = {
      Authorization: `Bearer ${auth.token}`,
    } as CommonHeaderProperties;

    setUser(auth.user);
    setToken(auth.token);
    setIsAuthenticated(true);
  }

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        user,
        invalidateAuthentication,
        saveAuthentication,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  const {
    isAuthenticated,
    isLoading,
    token,
    user,
    invalidateAuthentication,
    saveAuthentication,
  } = useContext(AuthenticationContext);

  return {
    isAuthenticated,
    isLoading,
    token,
    user,
    invalidateAuthentication,
    saveAuthentication,
  };
}

import { ReactNode } from 'react';

import { HeadersDefaults } from 'axios';

export type AuthenticationProviderProps = {
  children: ReactNode;
};

export interface CommonHeaderProperties extends HeadersDefaults {
  Authorization: string;
}

export interface User {
  id: string;
  nickname: string;
  image: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Auth {
  token: string;
  user: User;
}

export interface IAuthenticationContext {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  user: User | null;
  invalidateAuthentication: () => Promise<void>;
  saveAuthentication: (auth: Auth) => Promise<void>;
}

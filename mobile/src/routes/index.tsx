import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import { useAuthentication } from '../contexts/AuthenticationContext';
import { ChatProvider } from '../contexts/ChatContext';
import { StackAuthenticatedRoutes } from './stack.authenticated.routes';
import { StackRoutes } from './stack.routes';

export function Routes() {
  const { isLoading, isAuthenticated } = useAuthentication();
  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <StackAuthenticatedRoutes />
      ) : (
        <ChatProvider>
          <StackRoutes />
        </ChatProvider>
      )}
    </NavigationContainer>
  );
}

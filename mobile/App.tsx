import React from 'react';

import { ThemeProvider } from 'styled-components';

import { AuthenticationProvider } from './src/contexts/AuthenticationContext';
import { Routes } from './src/routes';
import theme from './src/style/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <Routes />
      </AuthenticationProvider>
    </ThemeProvider>
  );
}

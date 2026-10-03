import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import CartContextProvider from './contexts/cartContext';
import { StoreProvider } from './contexts/storeContext';
import { GlobalStyle, theme } from './theme';
import { ThemeProvider } from 'styled-components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <StoreProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);

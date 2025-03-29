import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline } from '@mui/material'

import { configureStore } from '@reduxjs/toolkit';
import categorySlice from "./slices/CategorySlice.js";
import searchSlice from "./slices/SearchBarSlice.js";
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  // You can customize the theme here if needed
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
// Create the root element using React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    category: categorySlice,
    search : searchSlice
  }
})

// Render the App component
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>,
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

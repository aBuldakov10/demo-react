import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Weather from '../../pages/Weather/Weather';
import PageNotFound from '../../pages/PageNotFound';

const theme = createTheme({
  typography: {
    fontFamily: '',
  },
  palette: {
    custom: {
      main: '#432874',
      dark: '#2c1a4d',
      contrastText: '#fff',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/demo-react" />} />
            <Route path="/demo-react" element={<Weather />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import './App.scss';
import { theme } from './theme';
import store from '../../store';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Weather from '../../pages/Weather/Weather';
import Tasks from '../../pages/Tasks';
import PageNotFound from '../../pages/PageNotFound';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />

        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/demo-react" />} />
              <Route path="/demo-react" element={<Weather />} />
              <Route path="/task-list" element={<Tasks />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;

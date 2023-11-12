import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

// Import general style
import './assets/scss/index.scss';

// Import mui provider
import { theme } from './components/App/theme';

// Include store
import store from './store';

// Import firebase
import './constants/firebase';

// Import app
import App from './components/App/App';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Navigate to="/ru" />} />
            <Route path="/:lng/*" element={<App />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);

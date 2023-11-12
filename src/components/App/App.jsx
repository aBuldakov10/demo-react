import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Files
import './App.scss';
import i18n from '../../constants/i18n';

// Firebase
import { app } from '../../constants/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Store
import { loginUser, logoutUser, userLoggedInState } from '../../store/auth/action';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RoutesList from '../../routes/RoutesList';

const App = () => {
  const { lng } = useParams();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const languages = ['en', 'ru'];

  useEffect(() => {
    const locStrUsr = localStorage.getItem('user_state');
    const sesStrLang = sessionStorage.getItem('lang');

    if (!!locStrUsr) {
      dispatch(userLoggedInState());

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, displayName, email, accessToken, metadata } = user;

          dispatch(loginUser(uid, displayName, email, accessToken, metadata.createdAt));
        } else {
          localStorage.removeItem('user_state');
          dispatch(logoutUser());
        }
      });
    }

    if (!sesStrLang) {
      sessionStorage.setItem('lang', lng);
      i18n.changeLanguage(lng);
    }
  }, []);

  if (!languages.includes(lng)) {
    return <Navigate to="/ru" />;
  }

  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <RoutesList />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;

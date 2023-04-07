import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Files
import './App.scss';

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
  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const locStr = localStorage.getItem('user_state');

    if (!!locStr) {
      dispatch(userLoggedInState());

      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(loginUser(user.uid, user.email, user.accessToken));
        } else {
          localStorage.removeItem('user_state');
          dispatch(logoutUser());
        }
      });
    }
  }, []);

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

import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

// Store
import { isAuthUserSelector } from '../store/auth/selectors';

// Components
import Weather from '../pages/Weather/Weather';
import Tasks from '../pages/Tasks';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Profile from '../pages/Profile';
import PageNotFound from '../pages/PageNotFound';

const RoutesList = () => {
  const loggedIn = useSelector(isAuthUserSelector);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/demo-react" />} />
      <Route path="/demo-react" element={<Weather />} />
      <Route path="/task-list" element={<Tasks />} />
      <Route path="/login" element={loggedIn ? <Navigate to="/profile" /> : <Login />} />
      <Route path="/register" element={<Navigate to="/registration" />} />
      <Route path="/registration" element={loggedIn ? <Navigate to="/profile" /> : <Registration />} />
      <Route path="/resetPassword" element={loggedIn ? <Navigate to="/profile" /> : <ResetPassword />} />
      <Route path="/account" element={<Navigate to="/profile" />} />
      <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesList;

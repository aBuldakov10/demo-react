import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';

// Store
import { isAuthUserSelector } from '../store/auth/selectors';

// Components
import Home from '../pages/Home';
import Weather from '../pages/Weather/Weather';
import ToDo from '../pages/ToDo/ToDo';
import Orders from '../pages/Orders/Orders';
import Login from '../pages/Login/Login';
import Registration from '../pages/Registration/Registration';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Profile from '../pages/Profile/Profile';
import PageNotFound from '../pages/PageNotFound';

const RoutesList = () => {
  const { lng } = useParams();
  const loggedIn = useSelector(isAuthUserSelector);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/to-do" element={<ToDo />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={loggedIn ? <Navigate to={`/${lng}/profile`} /> : <Login />} />
      <Route path="/register" element={<Navigate to={`/${lng}/registration`} />} />
      <Route path="/registration" element={loggedIn ? <Navigate to={`/${lng}/profile`} /> : <Registration />} />
      <Route path="/resetPassword" element={loggedIn ? <Navigate to={`/${lng}/profile`} /> : <ResetPassword />} />
      <Route path="/account" element={<Navigate to={`/${lng}/profile`} />} />
      <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to={`/${lng}/login`} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesList;

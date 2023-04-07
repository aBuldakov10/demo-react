import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Weather from '../pages/Weather/Weather';
import Tasks from '../pages/Tasks';
import PageNotFound from '../pages/PageNotFound';

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/demo-react" />} />
      <Route path="/demo-react" element={<Weather />} />
      <Route path="/task-list" element={<Tasks />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RoutesList;

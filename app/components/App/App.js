import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../../pages/Home/Home';
import Example from '../../pages/Example/Example';

const App = () => {
  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/example" element={<Example />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default App;

import React from 'react';

// Files
import './App.scss';

// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RoutesList from '../../routes/RoutesList';

const App = () => {
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

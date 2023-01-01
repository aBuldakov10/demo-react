import React from 'react';

import './Home.scss';
import img from './space.jpg';

const Home = () => {
  return (
    <div>
      <img src={img} alt="nature" style={{ width: 500 }} />
    </div>
  );
};

export default Home;

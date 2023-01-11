import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';
import logo from './logo.jpg';

const Logo = () => {
  return (
    <Link to={'/demo-react'} className="logo" target="">
      <img src={logo} alt="logo" title="logo" />
    </Link>
  );
};

export default Logo;

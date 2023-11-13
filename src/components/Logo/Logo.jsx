import React from 'react';
import { Link, useParams } from 'react-router-dom';

// Files
import './Logo.scss';
import logo from './logo.jpg';

const Logo = () => {
  const { lng } = useParams();

  return (
    <Link to={`/${lng}/`} className="logo" target="">
      <img src={logo} alt="logo" title="logo" />
    </Link>
  );
};

export default Logo;

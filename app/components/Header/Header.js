import React from 'react';

import './Header.scss';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { headerNav } from '../../constants/constants';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Logo />
          <Navigation nav={headerNav} />
        </div>
      </div>
    </header>
  );
};

export default Header;

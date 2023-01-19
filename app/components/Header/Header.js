import React from 'react';
import { Box } from '@mui/material';

import './Header.scss';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import { headerNav } from '../../constants/constants';

const Header = () => {
  return (
    <header className="header">
      <Box className="container">
        <Box className="header-content">
          <Logo />
          <Navigation nav={headerNav} />
        </Box>
      </Box>
    </header>
  );
};

export default Header;

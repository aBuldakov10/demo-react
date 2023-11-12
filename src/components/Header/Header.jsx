import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

// Files
import './Header.scss';
import { headerNav } from '../../constants/constants';

// Store
import { isAuthUserSelector } from '../../store/auth/selectors';

// Components
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import IsAuthUser from '../Auth/IsAuthUser';
import NoAuthUser from '../Auth/NoAuthUser';

const Header = () => {
  const loggedIn = useSelector(isAuthUserSelector);

  return (
    <header className="header">
      <Box className="container">
        <Box className="header-content">
          <Logo />
          <Navigation nav={headerNav} />

          <Box>
            <LangSwitcher />
            {loggedIn ? <IsAuthUser /> : <NoAuthUser />}
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default Header;

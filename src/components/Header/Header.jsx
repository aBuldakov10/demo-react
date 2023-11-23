import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import './Header.scss';

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
  const { t } = useTranslation();

  const headerNav = [
    {
      title: t('menu.home'),
      link: '/',
    },
    {
      title: t('menu.weather'),
      link: '/weather',
    },
    {
      title: t('menu.to-do'),
      link: '/to-do',
    },
    {
      title: t('menu.orders'),
      link: '/orders',
    },
    // {
    //   title: 'Example',
    //   link: '/example',
    // },
  ];

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

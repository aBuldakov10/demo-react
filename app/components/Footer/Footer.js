import React from 'react';
import { Typography, Box } from '@mui/material';
import { Copyright } from '@mui/icons-material';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <Box className="container">
        <Typography
          variant="body1"
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          Copyright{' '}
          <Copyright style={{ width: 17, marginLeft: 5, marginRight: 5 }} />{' '}
          2023. Company Inc.
        </Typography>
      </Box>
    </footer>
  );
};

export default Footer;

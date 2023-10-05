import React from 'react';
import { Box, CircularProgress } from '@mui/material';

// Files
import './Loader.scss';

const Loader = () => {
  return (
    <Box className="loader-wrapper">
      <CircularProgress color="inherit" />
    </Box>
  );
};

export default Loader;

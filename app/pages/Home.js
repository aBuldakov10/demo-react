import React from 'react';
import { Typography, Box } from '@mui/material';

// Components
import Timer from '../components/Timer/Timer';

// Hooks
import useMedia from '../hooks/useMedia';

const Home = () => {
  const small = useMedia('(max-width: 767px)');
  const large = useMedia('(min-width: 992px)');
  const medium = !small && !large;

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h6" component="p" align={'center'} style={{ fontWeight: 600 }}>
        {small && 'Mobile version'}
        {medium && 'Tablet version'}
        {large && 'Desktop version'}
      </Typography>

      {/*** Timer ***/}
      <Timer />
    </Box>
  );
};

export default Home;

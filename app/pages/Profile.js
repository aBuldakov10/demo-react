import React from 'react';
import { Box, Typography } from '@mui/material';

const Profile = () => {
  return (
    <Box sx={{ py: 3, maxWidth: 700, m: '0 auto' }}>
      <Typography variant="h5" component="h1" style={{ marginBottom: '.5em', fontWeight: 600 }}>
        User Profile
      </Typography>
    </Box>
  );
};

export default Profile;

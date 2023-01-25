import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';

import TaskForm from '../../components/Tasks/TaskForm';

const Tasks = () => {
  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={8}>
          <Typography
            variant="h6"
            component="h2"
            style={{ marginBottom: '.5em', fontWeight: 600 }}
          >
            Task list
          </Typography>

          <Box sx={{ borderRadius: 1, bgcolor: '#fff', p: 2 }}>
            <Typography
              variant="body1"
              align="center"
              style={{ fontSize: 22, color: '#aaa' }}
            >
              There are no tasks yet
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <TaskForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tasks;

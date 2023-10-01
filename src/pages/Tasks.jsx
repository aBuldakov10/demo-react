import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography, CircularProgress } from '@mui/material';

// Files
import { getTask } from '../components/Tasks/api';

// Store
import { getTasks, loaded } from '../store/tasks/actions';
import { taskListSelector, taskLoaderSelector } from '../store/tasks/selectors';

// Components
import TaskList from '../components/Tasks/TaskList';
import CreateTaskForm from '../components/Tasks/CreateTaskForm';
import DeleteTaskPopup from '../components/Tasks/DeleteTaskPopup';
import EditTaskPopup from '../components/Tasks/EditTaskPopup';

const Tasks = () => {
  const dispatch = useDispatch();
  const loader = useSelector(taskLoaderSelector);
  const taskList = useSelector(taskListSelector);

  // Set task list state on load page
  useEffect(() => {
    getTask().then((taskList) => {
      dispatch(getTasks(taskList));
      dispatch(loaded());
    });
  }, []);

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={8}>
          {/*** Task list title ***/}
          <Typography
            variant="h6"
            component="h2"
            style={{ marginBottom: '.5em', fontWeight: 600 }}
          >
            Task list
          </Typography>

          {loader ? (
            <>
              {/*** Loader ***/}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="inherit" />
              </Box>
            </>
          ) : Object.values(taskList).length === 0 ? (
            // No tasks notification
            <Box sx={{ borderRadius: 1, bgcolor: '#fff', p: 2 }}>
              <Typography
                variant="body1"
                align="center"
                style={{ fontSize: 22, color: '#aaa' }}
              >
                There are no tasks yet
              </Typography>
            </Box>
          ) : (
            <>
              {/*** Task list ***/}
              <TaskList />
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Box className="task-form-wrapper">
            {/*** Task form title ***/}
            <Typography
              variant="h6"
              component="h2"
              style={{ marginBottom: '.5em', fontWeight: 600 }}
            >
              New task
            </Typography>

            {/*** Create task form ***/}
            <CreateTaskForm />
          </Box>
        </Grid>
      </Grid>

      {/*** Confirmation delete task popup ***/}
      <DeleteTaskPopup />

      {/*** Edit task popup ***/}
      <EditTaskPopup />
    </Box>
  );
};

export default Tasks;

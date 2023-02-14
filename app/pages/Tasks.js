import React, { useEffect, useState, createContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography, CircularProgress } from '@mui/material';

import { getTask } from '../components/Tasks/api';

import TaskList from '../components/Tasks/TaskList';
import CreateTaskForm from '../components/Tasks/CreateTaskForm';
import DeleteTaskPopup from '../components/Tasks/DeleteTaskPopup';
import EditTaskPopup from '../components/Tasks/EditTaskPopup';

// Context
export const TaskListContext = createContext({});
export const TaskFormContext = createContext({});
export const DeleteTaskContext = createContext({});
export const EditTaskContext = createContext({});

const Tasks = () => {
  const [taskList, setTaskList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  // Task data for delete/edit
  const [taskId, setTaskId] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  // Set task list state on load page
  useEffect(() => {
    getTask().then((taskList) => {
      setTaskList(taskList);
      setIsLoading(false);
    });
  }, []);

  return (
    <TaskListContext.Provider
      value={{
        taskList,
        setTaskList,
        setTaskId,
        setTaskTitle,
        setTaskDescription,
        setOpenEditPopup,
        setOpenDeletePopup,
      }}
    >
      <TaskFormContext.Provider value={{ setTaskList }}>
        <DeleteTaskContext.Provider
          value={{
            openDeletePopup,
            setOpenDeletePopup,
            taskId,
            taskTitle,
            setTaskList,
          }}
        >
          <EditTaskContext.Provider
            value={{
              openEditPopup,
              setOpenEditPopup,
              taskId,
              setTaskList,
              taskTitle,
              taskDescription,
            }}
          >
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

                  {isLoading ? (
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
          </EditTaskContext.Provider>
        </DeleteTaskContext.Provider>
      </TaskFormContext.Provider>
    </TaskListContext.Provider>
  );
};

export default Tasks;

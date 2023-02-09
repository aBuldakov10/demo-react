import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Delete, Done } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import './Task.scss';
import {
  getTask,
  createTask,
  deleteTask,
  doneTask,
} from '../../components/Tasks/api';

import InputText from '../../components/Form/InputText';
import Textarea from '../../components/Form/Textarea';

const Tasks = () => {
  const [taskList, setTaskList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  // Task data for delete
  const [taskId, setTaskId] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');

  // Set task list state on load page
  useEffect(() => {
    getTask().then((taskList) => {
      setTaskList(taskList);
      setIsLoading(false);
    });
  }, []);

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

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress color="inherit" />
            </Box>
          ) : Object.values(taskList).length === 0 ? (
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
            <ul>
              {Object.values(taskList).map(
                ({ id, title, description, isDone }, index) => {
                  // Bottom spacing for task list item
                  const itemSpacing =
                    Object.values(taskList).length - 1 === index ? '' : 2;
                  const isDoneTask = isDone ? 'isDone' : 'done';

                  return (
                    <li key={id}>
                      <Box
                        data-task-id={id}
                        sx={{
                          position: 'relative',
                          borderRadius: 1,
                          bgcolor: '#fff',
                          p: 2,
                          mb: itemSpacing,
                          boxShadow: '0px 2px 5px 0px #d2d2d2;',
                        }}
                        className={`task-${isDoneTask}`}
                      >
                        <Typography
                          component="h4"
                          variant="body1"
                          sx={{ mb: '.75em', fontSize: '1.25rem' }}
                        >
                          <strong>#{id}.</strong> {title}
                        </Typography>

                        <Typography variant="body1" style={{ marginBottom: 0 }}>
                          {description}
                        </Typography>

                        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                          <Button
                            variant="contained"
                            color={isDoneTask}
                            title="Done"
                            sx={{ minWidth: 'inherit', p: 1, ml: 2 }}
                            onClick={() => {
                              // Mark task as done and rerender task list
                              doneTask(id).then((taskList) => {
                                setTaskList(taskList);
                              });
                            }}
                          >
                            <Done fontSize="small" />
                          </Button>

                          {/*<button>Edit</button>*/}

                          <Button
                            variant="contained"
                            color="delete"
                            title="Delete"
                            sx={{ minWidth: 'inherit', p: 1, ml: 2 }}
                            onClick={() => {
                              setTaskId(id); // Set task id state for delete popup
                              setTaskTitle(title); // Set task title state for delete popup
                              setOpenDeletePopup(true); // Open confirmation delete popup
                            }}
                          >
                            <Delete fontSize="small" />
                          </Button>
                        </Box>
                      </Box>
                    </li>
                  );
                }
              )}
            </ul>
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          {/*<TaskForm />*/}

          {/* Temp block */}
          <Box className="task-form-wrapper">
            <Typography
              variant="h6"
              component="h2"
              style={{ marginBottom: '.5em', fontWeight: 600 }}
            >
              New task
            </Typography>

            <Formik
              initialValues={{}}
              onSubmit={async (values, formikHelpers) => {
                const body = new FormData();

                Object.entries(values).forEach(([key, value]) => {
                  body.append(key, value);
                });

                // Create task and rerender task list
                await createTask(body).then((taskList) => {
                  setTaskList(taskList);
                });

                formikHelpers.resetForm();
              }}
              validationSchema={yup.object().shape({
                title: yup
                  .string()
                  .min(4)
                  .max(30)
                  .required('This field is required'),
                description: yup.string().max(150),
              })}
            >
              <Form
                className="form"
                style={{
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  padding: 16,
                  boxShadow: '0px 2px 5px 0px #d2d2d2',
                }}
              >
                <Field
                  id="titleId"
                  name="title"
                  label="Task name"
                  placeholder="Enter the task name"
                  component={InputText}
                />
                <Field
                  id="descriptionId"
                  name="description"
                  label="Task description"
                  placeholder="Enter the task description"
                  component={Textarea}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="custom"
                  sx={{
                    width: '100%',
                    fontSize: 16,
                    textTransform: 'none',
                  }}
                >
                  Create
                </Button>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>

      {/* Confirmation delete task popup */}
      <Dialog
        open={openDeletePopup}
        onClose={() => {
          setOpenDeletePopup(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete task <strong>#{taskId}</strong>?
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Task name: "{taskTitle}"
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="delete"
            title="Delete"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              setOpenDeletePopup(false); // Close popup

              // Delete task and rerender task list
              deleteTask(taskId).then((taskList) => {
                setTaskList(taskList);
              });
            }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="custom"
            title="Cancel"
            sx={{ textTransform: 'none' }}
            onClick={() => {
              setOpenDeletePopup(false); // Close popup without delete task
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;

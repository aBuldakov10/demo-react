import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

import { addTask, getTask } from '../../components/Tasks/api';

import InputText from '../../components/Form/InputText';
import Textarea from '../../components/Form/Textarea';

const Tasks = () => {
  const [taskList, setTaskList] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
                  const itemSpacing =
                    Object.values(taskList).length - 1 === index ? '' : 2;

                  return (
                    <li key={id}>
                      <Box
                        sx={{
                          position: 'relative',
                          borderRadius: 1,
                          bgcolor: '#fff',
                          p: 2,
                          mb: itemSpacing,
                          boxShadow: '0px 2px 5px 0px #d2d2d2;',
                        }}
                      >
                        <Typography
                          component="h4"
                          variant="body1"
                          sx={{ mb: '.75em', fontSize: '1.25rem' }}
                        >
                          {title}
                        </Typography>

                        <Typography variant="body1" style={{ marginBottom: 0 }}>
                          {description}
                        </Typography>

                        {/*<Box sx={{ position: 'absolute', top: 16, right: 16 }}>*/}
                        {/*  <button>Done</button>*/}
                        {/*  <button>Edit</button>*/}
                        {/*  <button>Remove</button>*/}
                        {/*</Box>*/}
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

                await addTask(body);

                formikHelpers.resetForm();

                getTask().then((taskList) => {
                  setTaskList(taskList);
                });
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
    </Box>
  );
};

export default Tasks;

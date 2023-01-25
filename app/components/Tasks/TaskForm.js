import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import { addTask } from './api';

import InputText from '../Form/InputText';
import Textarea from '../Form/Textarea';

const TaskForm = () => {
  return (
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
        }}
        validationSchema={yup.object().shape({
          title: yup.string().min(4).max(30).required('This field is required'),
          description: yup.string().max(150),
        })}
      >
        <Form
          className="form"
          style={{ borderRadius: 4, backgroundColor: '#fff', padding: 16 }}
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
            sx={{ width: '100%', fontSize: '16px', textTransform: 'none' }}
          >
            Create
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default TaskForm;

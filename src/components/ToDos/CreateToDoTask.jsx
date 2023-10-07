import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';

// Files
import { createTask } from './api';
import { taskValidation } from './validation';

// Store
import { addTask } from '../../store/tasks/actions';

// Components
import Text from '../Form/Text';
import Textarea from '../Form/Textarea';

const CreateToDoTask = () => {
  const dispatch = useDispatch();

  /*** Handlers ***/
  const handleCreateTask = (values) => {
    const createTime = Date.now().toString();
    const body = new FormData();

    body.append('createTime', createTime);

    Object.entries(values).forEach(([key, value]) => {
      body.append(key, value);
    });

    // Create task and rerender task list
    createTask(body).then((taskList) => dispatch(addTask(taskList)));
  };

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      onSubmit={async (values, { resetForm }) => {
        await handleCreateTask(values);

        resetForm();
      }}
      validationSchema={taskValidation}
    >
      <Form className="form to-do__form">
        <Field id="titleId" name="title" label="Task name" component={Text} placeholder="Enter the task name" />

        <Field
          id="descriptionId"
          name="description"
          label="Task description"
          placeholder="Enter the task description"
          component={Textarea}
        />

        <Button type="submit" variant="contained" color="custom" className="btn">
          Create
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateToDoTask;

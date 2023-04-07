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

const CreateTaskForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      onSubmit={async (values, { resetForm }) => {
        const createTime = Date.now().toString();
        const body = new FormData();

        body.append('createTime', createTime);

        Object.entries(values).forEach(([key, value]) => {
          body.append(key, value);
        });

        // Create task and rerender task list
        await createTask(body).then((taskList) => {
          dispatch(addTask(taskList));
        });

        resetForm();
      }}
      validationSchema={taskValidation}
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
        <Field id="titleId" name="title" label="Task name" placeholder="Enter the task name" component={Text} />

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
          sx={{ width: '100%', fontSize: 16, textTransform: 'none' }}
        >
          Create
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateTaskForm;

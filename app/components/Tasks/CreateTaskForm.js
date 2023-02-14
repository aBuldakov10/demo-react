import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';

import { createTask } from './api';
import { taskValidation } from './validation';

import InputText from '../Form/InputText';
import Textarea from '../Form/Textarea';
import { TaskFormContext } from '../../pages/Tasks';

const CreateTaskForm = () => {
  const { setTaskList } = useContext(TaskFormContext);

  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      onSubmit={async (values, formikHelpers) => {
        const createTime = Date.now().toString();
        const body = new FormData();

        body.append('createTime', createTime);

        Object.entries(values).forEach(([key, value]) => {
          body.append(key, value);
        });

        // Create task and rerender task list
        await createTask(body).then((taskList) => {
          setTaskList(taskList);
        });

        formikHelpers.resetForm();
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
          sx={{ width: '100%', fontSize: 16, textTransform: 'none' }}
        >
          Create
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateTaskForm;

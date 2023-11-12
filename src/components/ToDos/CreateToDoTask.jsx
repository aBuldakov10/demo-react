import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Validation massages
  const validationMessages = {
    required: t('to-do.validation.required'),
    min: t('to-do.validation.min'),
    max: t('to-do.validation.max'),
    characters: t('to-do.validation.characters'),
  };

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
      validationSchema={taskValidation(validationMessages)}
    >
      <Form className="form to-do__form">
        <Field
          id="titleId"
          name="title"
          label={t('to-do.create.name')}
          placeholder={t('to-do.create.name-placeholder')}
          component={Text}
        />

        <Field
          id="descriptionId"
          name="description"
          label={t('to-do.create.description')}
          placeholder={t('to-do.create.description-placeholder')}
          component={Textarea}
        />

        <Button type="submit" variant="contained" color="custom" className="btn">
          {t('to-do.create.button')}
        </Button>
      </Form>
    </Formik>
  );
};

export default CreateToDoTask;

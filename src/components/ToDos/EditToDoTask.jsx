import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

// Files
import { editTask } from './api';
import { taskValidation } from './validation';

// Store
import { editPopupSelector } from '../../store/tasks/selectors';
import { closeEditPopup, updateTask } from '../../store/tasks/actions';

// Components
import Text from '../Form/Text';
import Textarea from '../Form/Textarea';

const EditToDoTask = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Validation massages
  const validationMessages = {
    required: t('to-do.validation.required'),
    min: t('to-do.validation.min'),
    max: t('to-do.validation.max'),
    characters: t('to-do.validation.characters'),
  };

  const { id, title, description, state } = useSelector(editPopupSelector);

  /*** Handlers ***/
  const handleEditTask = (values) => {
    const body = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      body.append(key, value);
    });

    // Save new task data and rerender task list
    editTask(id, body).then((taskList) => dispatch(updateTask(taskList)));
  };

  return (
    <Dialog open={state} onClose={() => dispatch(closeEditPopup())} aria-labelledby="alert-dialog-title">
      <Formik
        initialValues={{
          title: title,
          description: description,
        }}
        onSubmit={async (values) => {
          await handleEditTask(values);

          dispatch(closeEditPopup()); // Close popup
        }}
        validationSchema={taskValidation(validationMessages)}
      >
        <Form className="form edit-to-do-task-form">
          <DialogTitle id="alert-dialog-title" sx={{ px: 0, pt: 0 }}>
            {t('to-do.edit.title')} <strong>#{id}</strong>
          </DialogTitle>

          <Field
            id="titleId"
            name="title"
            label={t('to-do.edit.name')}
            placeholder={t('to-do.edit.name-placeholder')}
            component={Text}
          />

          <Field
            id="descriptionId"
            name="description"
            label={t('to-do.edit.description')}
            placeholder={t('to-do.edit.description-placeholder')}
            component={Textarea}
          />

          <DialogActions sx={{ p: 0 }}>
            <Button variant="contained" color="primary" className="btn" title={t('to-do.edit.button')} type="submit">
              {t('to-do.edit.button')}
            </Button>

            <Button
              variant="contained"
              color="custom"
              className="btn"
              title={t('to-do.cancel')}
              type="button"
              onClick={() => dispatch(closeEditPopup())}
            >
              {t('to-do.cancel')}
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default EditToDoTask;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Field, Form, Formik } from 'formik';

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
        validationSchema={taskValidation}
      >
        <Form className="form edit-to-do-task-form">
          <DialogTitle id="alert-dialog-title" sx={{ px: 0, pt: 0 }}>
            Edit task <strong>#{id}</strong>
          </DialogTitle>

          <Field id="titleId" name="title" label="Task name" placeholder="Enter the task name" component={Text} />

          <Field
            id="descriptionId"
            name="description"
            label="Task description"
            placeholder="Enter the task description"
            component={Textarea}
          />

          <DialogActions sx={{ p: 0 }}>
            <Button variant="contained" color="primary" className="btn" title="Save task" type="submit">
              Save
            </Button>

            <Button
              variant="contained"
              color="custom"
              className="btn"
              title="Cancel"
              type="button"
              onClick={() => dispatch(closeEditPopup())}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default EditToDoTask;

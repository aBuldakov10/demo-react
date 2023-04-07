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

const EditTaskPopup = () => {
  const dispatch = useDispatch();
  const { id, title, description, state } = useSelector(editPopupSelector);

  return (
    <Dialog
      open={state}
      onClose={() => {
        dispatch(closeEditPopup());
      }}
      aria-labelledby="alert-dialog-title"
    >
      <Formik
        initialValues={{
          title: title,
          description: description,
        }}
        onSubmit={async (values) => {
          const body = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            body.append(key, value);
          });

          // Save new task data and rerender task list
          await editTask(id, body).then((taskList) => {
            dispatch(updateTask(taskList));
          });

          dispatch(closeEditPopup()); // Close popup
        }}
        validationSchema={taskValidation}
      >
        <Form
          className="form"
          style={{
            width: 500,
            borderRadius: 4,
            backgroundColor: '#fff',
            padding: 16,
            boxShadow: '0px 2px 5px 0px #d2d2d2',
          }}
        >
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
            <Button
              variant="contained"
              color="primary"
              title="Save task"
              type="submit"
              sx={{ textTransform: 'none', width: 100 }}
            >
              Save
            </Button>

            <Button
              variant="contained"
              color="custom"
              title="Cancel"
              type="button"
              sx={{ textTransform: 'none', width: 100 }}
              onClick={() => {
                dispatch(closeEditPopup()); // Close popup without edit task
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default EditTaskPopup;

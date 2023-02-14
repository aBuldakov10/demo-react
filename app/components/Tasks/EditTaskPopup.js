import React, { useContext } from 'react';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Field, Form, Formik } from 'formik';

import { editTask } from './api';
import { taskValidation } from './validation';

import InputText from '../Form/InputText';
import Textarea from '../Form/Textarea';
import { EditTaskContext } from '../../pages/Tasks';

const EditTaskPopup = () => {
  const {
    openEditPopup,
    setOpenEditPopup,
    taskId,
    setTaskList,
    taskTitle,
    taskDescription,
  } = useContext(EditTaskContext);

  return (
    <Dialog
      open={openEditPopup}
      onClose={() => {
        setOpenEditPopup(false);
      }}
      aria-labelledby="alert-dialog-title"
    >
      <Formik
        initialValues={{
          title: taskTitle,
          description: taskDescription,
        }}
        onSubmit={async (values) => {
          const body = new FormData();

          Object.entries(values).forEach(([key, value]) => {
            body.append(key, value);
          });

          // Save new task data and rerender task list
          await editTask(taskId, body).then((taskList) => {
            setTaskList(taskList);
          });

          setOpenEditPopup(false); // Close popup
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
            Edit task <strong>#{taskId}</strong>
          </DialogTitle>

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
                setOpenEditPopup(false); // Close popup without edit task
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

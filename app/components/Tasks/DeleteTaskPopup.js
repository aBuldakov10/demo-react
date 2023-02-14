import React, { useContext } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { deleteTask } from './api';
import { DeleteTaskContext } from '../../pages/Tasks';

const DeleteTaskPopup = () => {
  const {
    openDeletePopup,
    setOpenDeletePopup,
    taskId,
    taskTitle,
    setTaskList,
  } = useContext(DeleteTaskContext);

  return (
    <Dialog
      open={openDeletePopup}
      onClose={() => {
        setOpenDeletePopup(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete task <strong>#{taskId}</strong>?
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Task name: "{taskTitle}"
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="delete"
          title="Delete"
          sx={{ textTransform: 'none', width: 100 }}
          onClick={() => {
            setOpenDeletePopup(false); // Close popup

            // Delete task and rerender task list
            deleteTask(taskId).then((taskList) => {
              setTaskList(taskList);
            });
          }}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="custom"
          title="Cancel"
          sx={{ textTransform: 'none', width: 100 }}
          onClick={() => {
            setOpenDeletePopup(false); // Close popup without delete task
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskPopup;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

// Files
import { deleteTask } from './api';

// Store
import { deletePopupSelector } from '../../store/tasks/selectors';
import { closeDeletePopup, removeTask } from '../../store/tasks/actions';

const DeleteTaskPopup = () => {
  const dispatch = useDispatch();
  const { id, title, state } = useSelector(deletePopupSelector);

  return (
    <Dialog
      open={state}
      onClose={() => {
        dispatch(closeDeletePopup());
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to delete task <strong>#{id}</strong>?
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Task name: "{title}"
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="delete"
          title="Delete"
          sx={{ textTransform: 'none', width: 100 }}
          onClick={() => {
            dispatch(closeDeletePopup()); // Close popup

            // Delete task and rerender task list
            deleteTask(id).then((taskList) => {
              dispatch(removeTask(taskList));
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
            dispatch(closeDeletePopup()); // Close popup without delete task
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteTaskPopup;

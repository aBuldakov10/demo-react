import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import { deleteTask } from './api';

// Store
import { deletePopupSelector } from '../../store/tasks/selectors';
import { closeDeletePopup, removeTask } from '../../store/tasks/actions';

const DeleteToDoTask = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id, title, state } = useSelector(deletePopupSelector);

  return (
    <Dialog
      open={state}
      classes={{ paper: 'delete-to-do-task' }}
      onClose={() => dispatch(closeDeletePopup())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {t('to-do.delete.title')} <strong>#{id}</strong>?
      </DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('to-do.delete.name')} "{title}"
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="delete"
          title={t('to-do.delete.tip')}
          className="btn"
          onClick={() => {
            dispatch(closeDeletePopup()); // Close popup

            // Delete task and rerender task list
            deleteTask(id).then((taskList) => dispatch(removeTask(taskList)));
          }}
        >
          {t('to-do.delete.button')}
        </Button>

        <Button
          variant="contained"
          color="custom"
          title={t('to-do.cancel')}
          className="btn"
          onClick={() => dispatch(closeDeletePopup())}
        >
          {t('to-do.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteToDoTask;

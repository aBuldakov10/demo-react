import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

// Firebase
import { app } from '../../constants/firebase';
import { deleteUser, getAuth } from 'firebase/auth';

// Store
import { confirmCredentialPopup, logoutUser, toggleDeletePopup } from '../../store/auth/action';
import { deleteProfilePopupSelector } from '../../store/auth/selectors';

const ConfirmDeleteProfilePopup = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const deleteProfilePopupState = useSelector(deleteProfilePopupSelector); // Get delete profile popup state

  const handleCloseDeletePopup = () => dispatch(toggleDeletePopup(false));
  const handleDeleteProfile = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        handleCloseDeletePopup();
        localStorage.removeItem('user_state');
        dispatch(logoutUser());
      })
      .catch((error) => {
        dispatch(confirmCredentialPopup(true));
        handleCloseDeletePopup();
      });
  };

  return (
    <Dialog
      classes={{ paper: 'delete-popup' }}
      open={deleteProfilePopupState}
      aria-labelledby="alert-dialog-title"
      onClose={handleCloseDeletePopup}
    >
      <DialogTitle id="alert-dialog-title" className="delete-popup__title">
        Are you sure you want to delete your account?
      </DialogTitle>

      <DialogActions className="delete-popup__actions">
        <Button className="btn" variant="contained" color="delete" title="Delete" onClick={handleDeleteProfile}>
          Delete
        </Button>

        <Button className="btn" variant="contained" color="custom" title="Cancel" onClick={handleCloseDeletePopup}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteProfilePopup;

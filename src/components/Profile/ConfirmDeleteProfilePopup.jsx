import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Files
import './EditProfile.scss';

// Firebase
import { app } from '../../constants/firebase';
import { deleteUser, getAuth } from 'firebase/auth';

// Store
import { confirmCredentialPopup, logoutUser, toggleDeletePopup } from '../../store/auth/action';
import { deleteProfilePopupSelector } from '../../store/auth/selectors';

const ConfirmDeleteProfilePopup = () => {
  const auth = getAuth(app);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const deleteProfilePopupState = useSelector(deleteProfilePopupSelector); // Get delete profile popup state

  /*** Handlers ***/
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
        {t('profile.delete.confirm-delete')}
      </DialogTitle>

      <DialogActions className="delete-popup__actions">
        <Button
          className="btn"
          variant="contained"
          color="delete"
          title={t('profile.delete.button')}
          onClick={handleDeleteProfile}
        >
          {t('profile.delete.button')}
        </Button>

        <Button
          className="btn"
          variant="contained"
          color="custom"
          title={t('profile.cancel')}
          onClick={handleCloseDeletePopup}
        >
          {t('profile.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteProfilePopup;

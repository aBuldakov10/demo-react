import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';

// Files
import { confirmCredentialValidation } from './validation';

// Firebase
import { app } from '../../constants/firebase';
import { AuthErrorCodes, EmailAuthProvider, getAuth, reauthenticateWithCredential } from 'firebase/auth';

// Store
import {
  authError,
  confirmCredentialPopup,
  confirmCredentialSuccessMessage,
  noAuthError,
} from '../../store/auth/action';
import { authErrorSelector } from '../../store/auth/selectors';

// Components
import Text from '../../components/Form/Text';
import Password from '../../components/Form/Password';

const ConfirmCredentialPopup = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);

  // Custom close confirm popup function
  const handleCloseConfirmPopup = () => {
    isAuthError && dispatch(noAuthError()); // Remove auth error notification if it is
    dispatch(confirmCredentialPopup(false));
  };

  // User confirm credential function
  const handleReauthenticate = (confirmEmail, confirmPassword) => {
    const credential = EmailAuthProvider.credential(confirmEmail, confirmPassword);

    // Reauthenticate method using credential
    reauthenticateWithCredential(auth.currentUser, credential)
      .then((data) => {
        handleCloseConfirmPopup(); // Close credential popup
        dispatch(confirmCredentialSuccessMessage(true)); // Show success message

        // Hide success message after 5 seconds
        setTimeout(() => dispatch(confirmCredentialSuccessMessage(false)), 5000);
      })
      .catch((error) => {
        let errorTExt = '';

        if (error.code === AuthErrorCodes.INVALID_EMAIL) errorTExt = 'Invalid email';
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) errorTExt = 'Wrong password';
        if (error.code === AuthErrorCodes.USER_MISMATCH) errorTExt = 'The email you entered does not match yours';

        dispatch(authError(errorTExt));
      });
  };

  return (
    <Dialog
      open={true}
      onClose={handleCloseConfirmPopup}
      aria-labelledby="alert-dialog-title"
      classes={{ paper: 'confirm-popup' }}
    >
      <Formik
        initialValues={{ confirmEmail: '', confirmPassword: '' }}
        // Confirmation user mail and password values goes to handleReauthenticate as parameters
        onSubmit={({ confirmEmail, confirmPassword }) => handleReauthenticate(confirmEmail, confirmPassword)}
        validationSchema={confirmCredentialValidation}
      >
        <Form className="form">
          <DialogTitle id="alert-dialog-title" className="confirm-popup__title">
            Confirm your credentials
          </DialogTitle>

          <DialogContent sx={{ px: 0 }}>
            <DialogContentText sx={{ fontSize: 14 }}>
              If you want to change mail, password or delete account you have to authenticate again. After that can try
              to change mail, password or delete account again.
            </DialogContentText>
          </DialogContent>

          {isAuthError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {isAuthError}
            </Alert>
          )}

          <Field id="confirmEmailId" name="confirmEmail" label="Email" placeholder="Email" component={Text} />
          <Field
            id="confirmPasswordId"
            name="confirmPassword"
            label="Password"
            placeholder="Password"
            component={Password}
          />

          <DialogActions className="confirm-popup__actions">
            <Button variant="contained" color="primary" title="Save task" type="submit" className="btn">
              Confirm
            </Button>

            <Button
              variant="contained"
              className="btn"
              color="custom"
              title="Cancel"
              type="button"
              onClick={handleCloseConfirmPopup}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default ConfirmCredentialPopup;

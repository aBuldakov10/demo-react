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
        if (error.code === AuthErrorCodes.INVALID_EMAIL) {
          dispatch(authError('Invalid email'));
        }

        if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          dispatch(authError('Wrong password'));
        }

        if (error.code === AuthErrorCodes.USER_MISMATCH) {
          dispatch(authError('The email you entered does not match yours'));
        }
      });
  };

  return (
    <Dialog open={true} onClose={handleCloseConfirmPopup} aria-labelledby="alert-dialog-title">
      <Formik
        initialValues={{ confirmEmail: '', confirmPassword: '' }}
        // Confirmation user mail and password values goes to handleReauthenticate as parameters
        onSubmit={({ confirmEmail, confirmPassword }) => handleReauthenticate(confirmEmail, confirmPassword)}
        validationSchema={confirmCredentialValidation}
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
          <DialogTitle id="alert-dialog-title" sx={{ px: 0, pt: 0, pb: 1 }}>
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

          <DialogActions sx={{ p: 0 }}>
            <Button
              variant="contained"
              color="primary"
              title="Save task"
              type="submit"
              sx={{ textTransform: 'none', width: 100 }}
            >
              Confirm
            </Button>

            <Button
              variant="contained"
              color="custom"
              title="Cancel"
              type="button"
              sx={{ textTransform: 'none', width: 100 }}
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

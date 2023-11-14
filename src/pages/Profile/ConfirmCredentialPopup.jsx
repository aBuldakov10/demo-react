import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);

  // Validation
  const validationMessages = {
    required: t('profile.validation.required'),
  };

  /*** Handlers ***/
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

        if (error.code === AuthErrorCodes.INVALID_EMAIL) errorTExt = t('profile.error.mail');
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) errorTExt = t('profile.error.password');
        if (error.code === AuthErrorCodes.USER_MISMATCH) errorTExt = t('profile.error.mismatch');

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
        validationSchema={confirmCredentialValidation(validationMessages)}
      >
        <Form className="form">
          <DialogTitle id="alert-dialog-title" className="confirm-popup__title">
            {t('profile.confirm-cred.title')}
          </DialogTitle>

          <DialogContent sx={{ px: 0 }}>
            <DialogContentText sx={{ fontSize: 14 }}>{t('profile.confirm-cred.description')}</DialogContentText>
          </DialogContent>

          {isAuthError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {isAuthError}
            </Alert>
          )}

          <Field
            id="confirmEmailId"
            name="confirmEmail"
            label={t('profile.mail')}
            placeholder={t('profile.mail-placeholder')}
            component={Text}
          />
          <Field
            id="confirmPasswordId"
            name="confirmPassword"
            label={t('profile.new-password')}
            placeholder={t('profile.new-password-placeholder')}
            component={Password}
          />

          <DialogActions className="confirm-popup__actions">
            <Button
              variant="contained"
              color="primary"
              title={t('profile.confirm-cred.button')}
              type="submit"
              className="btn"
            >
              {t('profile.confirm-cred.button')}
            </Button>

            <Button
              variant="contained"
              className="btn"
              color="custom"
              title={t('profile.cancel')}
              type="button"
              onClick={handleCloseConfirmPopup}
            >
              {t('profile.cancel')}
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default ConfirmCredentialPopup;

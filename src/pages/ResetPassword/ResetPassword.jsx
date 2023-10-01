import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';

// Files
import { resetPasswordValidation } from './validation';

// Firebase
import { app } from '../../constants/firebase';
import { AuthErrorCodes, getAuth, sendPasswordResetEmail } from 'firebase/auth';

// Store
import { authError, noAuthError, resetPassword } from '../../store/auth/action';
import { authErrorSelector, resetPasswordRequestSelector } from '../../store/auth/selectors';

// Components
import Text from '../../components/Form/Text';

const ResetPassword = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);
  const resetPasswordState = useSelector(resetPasswordRequestSelector);

  const handleNoAuthError = () => isAuthError && dispatch(noAuthError());

  auth.languageCode = 'ru';

  return (
    <Box sx={{ py: 3, maxWidth: 700, m: '0 auto' }}>
      <Typography variant="h5" component="h1" style={{ marginBottom: '.5em', fontWeight: 600 }}>
        Reset password
      </Typography>

      <Box sx={{ borderRadius: 1, backgroundColor: '#fff', p: 2 }}>
        {!resetPasswordState ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={resetPasswordValidation}
            onSubmit={({ email }) => {
              sendPasswordResetEmail(auth, email)
                .then(() => {
                  handleNoAuthError();
                  dispatch(resetPassword(true));

                  setTimeout(() => {
                    dispatch(resetPassword(false));
                  }, 10000);
                })
                .catch((error) => {
                  if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                    dispatch(authError('Invalid email'));
                  }
                });
            }}
          >
            <Form className="form">
              {isAuthError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {isAuthError}
                </Alert>
              )}

              <Field id="resetPasswordMail" name="email" label="Email" placeholder="Email" component={Text} />

              <Button
                type="submit"
                variant="contained"
                color="custom"
                sx={{ display: 'flex', ml: 'auto', fontSize: 16, textTransform: 'none' }}
              >
                Reset password
              </Button>
            </Form>
          </Formik>
        ) : (
          <Typography variant="body" component="p" sx={{ fontSize: 14 }}>
            The "Reset password" request was sent to your email successfully. Check your email and follow the
            instruction. Then you can log in with new password. You can create new account also.
          </Typography>
        )}

        <Typography variant="body" component="p" sx={{ fontSize: 14, textAlign: 'center', mt: 2 }}>
          <Link to="/login" className="link" onClick={handleNoAuthError}>
            Login
          </Link>{' '}
          or{' '}
          <Link to="/registration" className="link" onClick={handleNoAuthError}>
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;

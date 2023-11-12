import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';

// Files
import './ResetPassword.scss';
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
  const { lng } = useParams();
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);
  const resetPasswordState = useSelector(resetPasswordRequestSelector);
  auth.languageCode = 'ru';

  /*** Handlers ***/
  const handleNoAuthError = () => isAuthError && dispatch(noAuthError());

  const handleResetPassword = (auth, mail) => {
    sendPasswordResetEmail(auth, mail)
      .then(() => {
        handleNoAuthError();
        dispatch(resetPassword(true));

        setTimeout(() => dispatch(resetPassword(false)), 10000);
      })
      .catch((error) => {
        let errorTExt = '';

        if (error.code === AuthErrorCodes.INVALID_EMAIL) errorTExt = 'Invalid email';

        dispatch(authError(errorTExt));
      });
  };

  return (
    <Box className="reset-password-page">
      <Typography className="reset-password-page__title" variant="h5" component="h1">
        Reset password
      </Typography>

      <Box className="reset-password-form-wrapper">
        {!resetPasswordState ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={resetPasswordValidation}
            onSubmit={({ email }) => handleResetPassword(auth, email)}
          >
            <Form className="form">
              {isAuthError && <Alert severity="error">{isAuthError}</Alert>}

              <Field id="resetPasswordMail" name="email" label="Email" placeholder="Email" component={Text} />

              <Button className="btn" type="submit" variant="contained" color="custom">
                Reset password
              </Button>
            </Form>
          </Formik>
        ) : (
          <Typography className="reset-success" variant="body" component="p">
            The "Reset password" request was sent to your email successfully. Check your email and follow the
            instruction. Then you can log in with new password. You can create new account also.
          </Typography>
        )}

        <Typography className="login-or-register" variant="body" component="p">
          <Link to={`/${lng}/login`} className="link" onClick={handleNoAuthError}>
            Login
          </Link>{' '}
          or{' '}
          <Link to={`/${lng}/registration`} className="link" onClick={handleNoAuthError}>
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;

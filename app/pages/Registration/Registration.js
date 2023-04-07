import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';

// Files
import { registerValidation } from './validation';

// Firebase
import { app } from '../../constants/firebase';
import { createUserWithEmailAndPassword, getAuth, AuthErrorCodes } from 'firebase/auth';

// Store
import { authError, loginUser, noAuthError } from '../../store/auth/action';
import { authErrorSelector } from '../../store/auth/selectors';

// Components
import Text from '../../components/Form/Text';
import Password from '../../components/Form/Password';

const Registration = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);

  return (
    <Box sx={{ py: 3, maxWidth: 700, m: '0 auto' }}>
      <Typography variant="h5" component="h1" style={{ marginBottom: '.5em', fontWeight: 600 }}>
        Registration
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registerValidation}
        onSubmit={({ email, password }) => {
          createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
              const { uid, email, accessToken } = user;

              localStorage.setItem('user_state', 'logged_in');
              dispatch(loginUser(uid, email, accessToken));
            })
            .catch((error) => {
              if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                dispatch(authError('Email already in use'));
              }

              if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                dispatch(authError('Invalid email'));
              }
            });
        }}
      >
        <Form className="form" style={{ borderRadius: 4, backgroundColor: '#fff', padding: 16 }}>
          {isAuthError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {isAuthError}
            </Alert>
          )}

          <Field id="registerMail" name="email" label="Email" placeholder="Email" component={Text} />

          <Field
            id="registerPassword"
            className="form__password"
            name="password"
            label="Password"
            placeholder="Password"
            component={Password}
          />

          <Button
            type="submit"
            variant="contained"
            color="custom"
            sx={{ display: 'flex', ml: 'auto', fontSize: 16, textTransform: 'none' }}
          >
            Register
          </Button>

          <Typography
            variant="body"
            component="p"
            sx={{ fontSize: '14px', textAlign: 'center', mt: 2 }}
            style={{ marginBottom: 0 }}
          >
            Already have account?
            <Link
              to="/login"
              className="link"
              style={{ marginLeft: '10px' }}
              onClick={() => isAuthError && dispatch(noAuthError())}
            >
              Login
            </Link>
          </Typography>
        </Form>
      </Formik>
    </Box>
  );
};

export default Registration;

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';

// Files
import { loginValidation } from './validation';

// Firebase
import { app } from '../../constants/firebase';
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';

// Store
import { authError, loginUser, noAuthError } from '../../store/auth/action';
import { authErrorSelector } from '../../store/auth/selectors';

// Components
import Text from '../../components/Form/Text';
import Password from '../../components/Form/Password';

const Login = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);
  const handleNoAuthError = () => isAuthError && dispatch(noAuthError());

  return (
    <Box sx={{ py: 3, maxWidth: 700, m: '0 auto' }}>
      <Typography variant="h5" component="h1" style={{ marginBottom: '.5em', fontWeight: 600 }}>
        Login
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation}
        onSubmit={({ email, password }) => {
          signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
              const { uid, displayName, email, accessToken, metadata } = user;

              localStorage.setItem('user_state', 'logged_in');
              dispatch(loginUser(uid, displayName, email, accessToken, metadata.createdAt));
            })
            .catch((error) => {
              if (error.code === AuthErrorCodes.INVALID_EMAIL) {
                dispatch(authError('Invalid email'));
              }

              if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
                dispatch(authError('Wrong password'));
              }

              if (error.code === AuthErrorCodes.USER_DELETED) {
                dispatch(authError('User not found. Enter correct email or register'));
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

          <Field id="loginMail" name="email" label="Email" placeholder="Email" component={Text} />

          <Field
            id="loginPassword"
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
            Login
          </Button>

          <Typography
            variant="body"
            component="p"
            sx={{ fontSize: '14px', textAlign: 'center', mt: 2 }}
            style={{ marginBottom: 0 }}
          >
            Don't have account?
            <Link to="/registration" className="link" style={{ marginLeft: '10px' }} onClick={handleNoAuthError}>
              Register
            </Link>
          </Typography>

          <Link
            to="/resetPassword"
            className="link"
            style={{
              position: 'relative',
              transform: 'translateX(-50%)',
              left: '50%',
              display: 'inline-block',
              marginTop: '16px',
              fontSize: '14px',
            }}
            onClick={handleNoAuthError}
          >
            Forget password?
          </Link>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;

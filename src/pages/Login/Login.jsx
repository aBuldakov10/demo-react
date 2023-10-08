import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';

// Files
import './Login.scss';
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

  /*** Handlers ***/
  const handleNoAuthError = () => isAuthError && dispatch(noAuthError());

  const handleLogin = (auth, mail, pass) => {
    signInWithEmailAndPassword(auth, mail, pass)
      .then(({ user }) => {
        const { uid, displayName, email, accessToken, metadata } = user;

        localStorage.setItem('user_state', 'logged_in');

        dispatch(loginUser(uid, displayName, email, accessToken, metadata.createdAt));
      })
      .catch((error) => {
        let errorTExt = '';

        if (error.code === AuthErrorCodes.INVALID_EMAIL) errorTExt = 'Invalid email';
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) errorTExt = 'Wrong password';
        if (error.code === AuthErrorCodes.USER_DELETED) errorTExt = 'User not found. Enter correct email or register';

        dispatch(authError(errorTExt));
      });
  };

  return (
    <Box className="login-page">
      <Typography className="login-page__title" variant="h5" component="h1">
        Login
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation}
        onSubmit={({ email, password }) => handleLogin(auth, email, password)}
      >
        <Form className="form">
          {isAuthError && <Alert severity="error">{isAuthError}</Alert>}

          <Field id="loginMail" name="email" label="Email" placeholder="Email" component={Text} />

          <Field
            id="loginPassword"
            className="form__password"
            name="password"
            label="Password"
            placeholder="Password"
            component={Password}
          />

          <Button className="btn" type="submit" variant="contained" color="custom">
            Login
          </Button>

          <Typography className="login-page__dont-have-account" variant="body" component="p">
            Don't have account?
            <Link to="/registration" className="link" onClick={handleNoAuthError}>
              Register
            </Link>
          </Typography>

          <Link to="/resetPassword" className="login-page__forget-password link" onClick={handleNoAuthError}>
            Forget password?
          </Link>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;

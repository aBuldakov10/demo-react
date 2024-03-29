import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

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
import HeadPage from '../../components/HeadPage';
import Text from '../../components/Form/Text';
import Password from '../../components/Form/Password';

const Login = () => {
  const auth = getAuth(app);
  const { lng } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);

  // Page head meta data
  const pageHeadData = {
    title: t('auth.login.page.title'),
    description: t('auth.login.page.description'),
    keywords: t('auth.login.page.keywords'),
    bodyAttributes: { class: 'login-page' },
  };

  // Validation
  const validationMessages = {
    required: t('auth.validation.required'),
  };

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

        if (error.code === AuthErrorCodes.INVALID_EMAIL) errorTExt = t('auth.error.mail');
        if (error.code === AuthErrorCodes.INVALID_PASSWORD) errorTExt = t('auth.error.password');
        if (error.code === AuthErrorCodes.USER_DELETED) errorTExt = t('auth.error.no-user');

        dispatch(authError(errorTExt));
      });
  };

  return (
    <Box className="login">
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Typography className="login__title" variant="h5" component="h1">
        {t('auth.login.title')}
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginValidation(validationMessages)}
        onSubmit={({ email, password }) => handleLogin(auth, email, password)}
      >
        <Form className="form">
          {isAuthError && <Alert severity="error">{isAuthError}</Alert>}

          <Field
            id="loginMail"
            name="email"
            label={t('auth.mail')}
            placeholder={t('auth.mail-placeholder')}
            component={Text}
          />

          <Field
            id="loginPassword"
            className="form__password"
            name="password"
            label={t('auth.password')}
            placeholder={t('auth.password-placeholder')}
            component={Password}
          />

          <Button className="btn" type="submit" variant="contained" color="custom">
            {t('auth.login.button')}
          </Button>

          <Typography className="login__dont-have-account" variant="body" component="p">
            {t('auth.login.register-msg')}
            <Link to={`/${lng}/registration`} className="link" onClick={handleNoAuthError}>
              {t('auth.login.register-link')}
            </Link>
          </Typography>

          <Link to={`/${lng}/resetPassword`} className="login__forget-password link" onClick={handleNoAuthError}>
            {t('auth.login.forget')}
          </Link>
        </Form>
      </Formik>
    </Box>
  );
};

export default Login;

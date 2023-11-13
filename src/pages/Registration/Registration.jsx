import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Alert } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

// Files
import './Registration.scss';
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
  const { lng } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);

  // Validation
  const validationMessages = {
    required: t('auth.validation.required'),
    min: t('auth.validation.min'),
    characters: t('auth.validation.characters'),
  };

  /*** Handlers ***/
  const handleRegister = (auth, mail, pass) => {
    createUserWithEmailAndPassword(auth, mail, pass)
      .then(({ user }) => {
        const { uid, displayName, email, accessToken, metadata } = user;

        localStorage.setItem('user_state', 'logged_in');

        dispatch(loginUser(uid, displayName, email, accessToken, metadata.createdAt));
      })
      .catch((error) => {
        let errorTExt = '';

        if (error.code === AuthErrorCodes.EMAIL_EXISTS) errorTExt = 'Email already in use';
        if (error.code === AuthErrorCodes.INVALID_EMAIL) errorTExt = 'Invalid email';

        dispatch(authError(errorTExt));
      });
  };

  return (
    <Box className="registration-page">
      <Typography className="registration-page__title" variant="h5" component="h1">
        {t('auth.registration.title')}
      </Typography>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={registerValidation(validationMessages)}
        onSubmit={({ email, password }) => handleRegister(auth, email, password)}
      >
        <Form className="form">
          {isAuthError && <Alert severity="error">{isAuthError}</Alert>}

          <Field
            id="registerMail"
            name="email"
            label={t('auth.mail')}
            placeholder={t('auth.mail-placeholder')}
            component={Text}
          />

          <Field
            id="registerPassword"
            className="form__password"
            name="password"
            label={t('auth.password')}
            placeholder={t('auth.password-placeholder')}
            component={Password}
          />

          <Button className="btn" type="submit" variant="contained" color="custom">
            {t('auth.registration.button')}
          </Button>

          <Typography className="registration-page__have-account" variant="body" component="p">
            {t('auth.registration.login-msg')}
            <Link to={`/${lng}/login`} className="link" onClick={() => isAuthError && dispatch(noAuthError())}>
              {t('auth.registration.login-link')}
            </Link>
          </Typography>
        </Form>
      </Formik>
    </Box>
  );
};

export default Registration;

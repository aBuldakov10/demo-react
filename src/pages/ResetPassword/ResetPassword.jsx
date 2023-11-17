import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Box, Button, Typography } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

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
import HeadPage from '../../components/HeadPage';
import Text from '../../components/Form/Text';

const ResetPassword = () => {
  const auth = getAuth(app);
  const { lng } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthError = useSelector(authErrorSelector);
  const resetPasswordState = useSelector(resetPasswordRequestSelector);
  auth.languageCode = 'ru';

  // Page head meta data
  const pageHeadData = {
    title: t('auth.restore.page.title'),
    description: t('auth.restore.page.description'),
    keywords: t('auth.restore.page.keywords'),
    bodyAttributes: { class: 'restore-password-page' },
  };

  // Validation
  const validationMessages = {
    required: t('auth.validation.required'),
  };

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
    <Box className="reset-password">
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Typography className="reset-password__title" variant="h5" component="h1">
        {t('auth.restore.title')}
      </Typography>

      <Box className="reset-password-form-wrapper">
        {!resetPasswordState ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={resetPasswordValidation(validationMessages)}
            onSubmit={({ email }) => handleResetPassword(auth, email)}
          >
            <Form className="form">
              {isAuthError && <Alert severity="error">{isAuthError}</Alert>}

              <Field
                id="resetPasswordMail"
                name="email"
                label={t('auth.mail')}
                placeholder={t('auth.mail-placeholder')}
                component={Text}
              />

              <Button className="btn" type="submit" variant="contained" color="custom">
                {t('auth.restore.button')}
              </Button>
            </Form>
          </Formik>
        ) : (
          <Typography className="reset-success" variant="body" component="p">
            {t('auth.restore.success-msg')}
          </Typography>
        )}

        <Typography className="login-or-register" variant="body" component="p">
          <Link to={`/${lng}/login`} className="link" onClick={handleNoAuthError}>
            {t('auth.restore.login-link')}
          </Link>{' '}
          {t('auth.restore.or')}{' '}
          <Link to={`/${lng}/registration`} className="link" onClick={handleNoAuthError}>
            {t('auth.restore.register-link')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;

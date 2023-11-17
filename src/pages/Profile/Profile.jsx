import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Box, Button, Divider, Typography, Alert } from '@mui/material';
import { Email } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

// Files
import './Profile.scss';
import { changePasswordValidation } from './validation';

// Firebase
import { app } from '../../constants/firebase';
import { getAuth, updatePassword } from 'firebase/auth';

// Store
import {
  profileSuccessMessage,
  toggleEditProfileForm,
  confirmCredentialPopup,
  toggleDeletePopup,
} from '../../store/auth/action';
import {
  confirmCredentialPopupSelector,
  confirmCredentialSuccessMessageSelector,
  deleteProfilePopupSelector,
  editProfileFormSelector,
  profileSuccessMessageSelector,
  userInfoSelector,
} from '../../store/auth/selectors';

// Components
import HeadPage from '../../components/HeadPage';
import Password from '../../components/Form/Password';
import ConfirmCredentialPopup from './ConfirmCredentialPopup';
import ConfirmDeleteProfilePopup from './ConfirmDeleteProfilePopup';
import EditProfileForm from './EditProfileForm';

const Profile = () => {
  const auth = getAuth(app);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const editProfileFormState = useSelector(editProfileFormSelector); // Get edit profile form state
  const deleteProfilePopupState = useSelector(deleteProfilePopupSelector); // Get delete profile popup state
  const profileSuccessMessageState = useSelector(profileSuccessMessageSelector); // Get profile success message
  const { id, userName, email, createdAt } = useSelector(userInfoSelector); // Get user info
  const confirmCredentialPopupState = useSelector(confirmCredentialPopupSelector); // Get confirm credential popup state
  const confirmCredentialSuccessMessageState = useSelector(confirmCredentialSuccessMessageSelector); // Get credential success message state
  const createdAccountDate = new Date(+createdAt).toLocaleDateString(); // Get create account date

  // Page head meta data
  const pageHeadData = {
    title: t('profile.page.title'),
    description: t('profile.page.description'),
    keywords: t('profile.page.keywords'),
    bodyAttributes: { class: 'profile-page' },
  };

  // Validation
  const validationMessages = {
    required: t('profile.validation.required'),
    min: t('profile.validation.min'),
    characters: t('profile.validation.characters'),
  };

  /*** Handlers ***/
  const handleChangePassword = async (newPassword) => {
    await updatePassword(auth.currentUser, newPassword)
      .then(() => {
        dispatch(profileSuccessMessage('Password changed successful'));
        setTimeout(() => dispatch(profileSuccessMessage()), 5000);
      })
      .catch((error) => dispatch(confirmCredentialPopup(true)));
  };
  const handleToggleEditForm = () => dispatch(toggleEditProfileForm(true));
  const handleDeletePopup = () => dispatch(toggleDeletePopup(true));

  return (
    <Box sx={{ py: 3 }} className="profile">
      {/*** Head ***/}
      <HeadPage headPageData={pageHeadData} />

      <Grid container spacing={4}>
        {/*** Profile sidebar ***/}
        <Grid item xs={12} md={4}>
          <Box className="profile__block profile__sidebar">
            <Avatar className="profile__sidebar-avatar">B</Avatar>

            <Typography className="profile__sidebar-info" variant="body" component="p">
              {t('profile.created')} {createdAccountDate}
            </Typography>
          </Box>
        </Grid>

        {/*** Profile content ***/}
        <Grid item xs={12} md={8}>
          <Box className="profile__block profile__content">
            {/*** Credential success message ***/}
            {confirmCredentialSuccessMessageState && (
              <Alert className="profile__content-alert" severity="success">
                {t('profile.confirm-cred.notify')}
              </Alert>
            )}

            {/*** Profile success message ***/}
            {profileSuccessMessageState && (
              <Alert className="profile__content-alert" severity="success">
                {profileSuccessMessageState}
              </Alert>
            )}

            {/*** Authenticate message ***/}
            <Alert className="profile__content-alert" variant="outlined" severity="info">
              {t('profile.warning')}
            </Alert>

            {/*** User info or update info form ***/}
            {editProfileFormState ? (
              <EditProfileForm />
            ) : (
              <Box className="profile__content-item user-info">
                <Typography className="user-info__username" variant="h4" component="h1" data-user-id={id}>
                  {userName ? userName : 'User Name'}
                </Typography>

                <Typography className="user-info__usermail" variant="body" component="p">
                  <Email />
                  {email ? email : 'user@mail.com'}
                </Typography>

                <Button
                  className="btn user-info__edit-btn"
                  variant="contained"
                  color="custom"
                  title={t('profile.edit-info.button')}
                  onClick={handleToggleEditForm}
                >
                  {t('profile.edit-info.button')}
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/*** Change password ***/}
            <Box className="profile__content-item">
              <Typography className="profile__content-title" variant="body" component="p">
                {t('profile.change-pass.title')}
              </Typography>

              <Typography className="profile__content-subtitle" variant="body" component="p">
                {t('profile.change-pass.description')}
              </Typography>

              <Formik
                initialValues={{ newPassword: '' }}
                validationSchema={changePasswordValidation(validationMessages)}
                onSubmit={({ newPassword }, { resetForm }) => handleChangePassword(newPassword).then(() => resetForm())}
              >
                <Form className="form change-password-form">
                  <Field
                    id="newPassword"
                    className="form__password"
                    name="newPassword"
                    label={t('profile.new-password')}
                    placeholder={t('profile.new-password-placeholder')}
                    component={Password}
                  />
                  <Button
                    className="btn"
                    type="submit"
                    title={t('profile.change-pass.button')}
                    variant="contained"
                    color="custom"
                  >
                    {t('profile.change-pass.button')}
                  </Button>
                </Form>
              </Formik>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/*** Delete account ***/}
            <Box className="profile__content-item">
              <Typography className="profile__content-title" color="error" variant="body" component="p">
                {t('profile.delete.title')}
              </Typography>

              <Typography className="profile__content-subtitle" variant="body" component="p">
                {t('profile.delete.description')}
              </Typography>

              <Button
                className="btn"
                variant="contained"
                title={t('profile.delete.button')}
                color="error"
                onClick={handleDeletePopup}
              >
                {t('profile.delete.button')}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/*** Confirm update profile popup - edit profile and update password ***/}
      {confirmCredentialPopupState && <ConfirmCredentialPopup />}

      {/*** Confirm delete profile popup ***/}
      {deleteProfilePopupState && <ConfirmDeleteProfilePopup />}
    </Box>
  );
};

export default Profile;

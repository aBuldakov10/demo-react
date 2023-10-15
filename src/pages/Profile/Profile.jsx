import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Avatar, Box, Button, Divider, Typography, Alert } from '@mui/material';
import { Email } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';

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
import Password from '../../components/Form/Password';
import ConfirmCredentialPopup from './ConfirmCredentialPopup';
import ConfirmDeleteProfilePopup from './ConfirmDeleteProfilePopup';
import EditProfileForm from './EditProfileForm';

const Profile = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const editProfileFormState = useSelector(editProfileFormSelector); // Get edit profile form state
  const deleteProfilePopupState = useSelector(deleteProfilePopupSelector); // Get delete profile popup state
  const profileSuccessMessageState = useSelector(profileSuccessMessageSelector); // Get profile success message
  const { id, userName, email, createdAt } = useSelector(userInfoSelector); // Get user info
  const confirmCredentialPopupState = useSelector(confirmCredentialPopupSelector); // Get confirm credential popup state
  const confirmCredentialSuccessMessageState = useSelector(confirmCredentialSuccessMessageSelector); // Get credential success message state
  const createdAccountDate = new Date(+createdAt).toLocaleDateString(); // Get create account date

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
      <Grid container spacing={4}>
        {/*** Profile sidebar ***/}
        <Grid item xs={12} md={4}>
          <Box className="profile__block profile__sidebar">
            <Avatar className="profile__sidebar-avatar">B</Avatar>

            <Typography className="profile__sidebar-info" variant="body" component="p">
              Account created at {createdAccountDate}
            </Typography>
          </Box>
        </Grid>

        {/*** Profile content ***/}
        <Grid item xs={12} md={8}>
          <Box className="profile__block profile__content">
            {/*** Credential success message ***/}
            {confirmCredentialSuccessMessageState && (
              <Alert className="profile__content-alert" severity="success">
                Confirm credential success
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
              To edit profile and change password you may have to authenticate again.
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
                  title="Edit user info"
                  onClick={handleToggleEditForm}
                >
                  Edit profile
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/*** Change password ***/}
            <Box className="profile__content-item">
              <Typography className="profile__content-title" variant="body" component="p">
                Change password
              </Typography>

              <Typography className="profile__content-subtitle" variant="body" component="p">
                Enter new password. You may have to authenticate again for security reasons.
              </Typography>

              <Formik
                initialValues={{ newPassword: '' }}
                validationSchema={changePasswordValidation}
                onSubmit={({ newPassword }, { resetForm }) => handleChangePassword(newPassword).then(() => resetForm())}
              >
                <Form className="form change-password-form">
                  <Field
                    id="newPassword"
                    className="form__password"
                    name="newPassword"
                    label="New password"
                    placeholder="New password"
                    component={Password}
                  />
                  <Button className="btn" type="submit" variant="contained" color="custom">
                    Update password
                  </Button>
                </Form>
              </Formik>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/*** Delete account ***/}
            <Box className="profile__content-item">
              <Typography className="profile__content-title" color="error" variant="body" component="p">
                Delete account
              </Typography>

              <Typography className="profile__content-subtitle" variant="body" component="p">
                Once you delete your account, there is no going back. Please be certain. You may have to authenticate
                again for security reasons.
              </Typography>

              <Button className="btn" variant="contained" color="error" onClick={handleDeletePopup}>
                Delete
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

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

  const handleChangePassword = async (newPassword) => {
    await updatePassword(auth.currentUser, newPassword)
      .then(() => {
        dispatch(profileSuccessMessage('Password changed successful'));
        setTimeout(() => dispatch(profileSuccessMessage()), 5000);
      })
      .catch((error) => dispatch(confirmCredentialPopup(true)));
  };

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#fff', boxShadow: '0px 2px 5px 0px #d2d2d2;', height: '100%' }}>
            <Avatar
              sx={{ backgroundColor: '#eee', color: '#432874', fontSize: 120, width: 200, height: 200, mx: 'auto' }}
            >
              B
            </Avatar>

            <Typography
              variant="body"
              component="p"
              style={{ marginTop: '.5em', fontSize: 12, textAlign: 'center', color: '#666' }}
            >
              Account created at {createdAccountDate}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: '#fff', boxShadow: '0px 2px 5px 0px #d2d2d2;' }}>
            {confirmCredentialSuccessMessageState && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Confirm credential success
              </Alert>
            )}

            {profileSuccessMessageState && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {profileSuccessMessageState}
              </Alert>
            )}

            <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
              To edit profile and change password you may have to authenticate again.
            </Alert>

            {/*** User info or update info form ***/}
            {editProfileFormState ? (
              <EditProfileForm />
            ) : (
              <Box sx={{ position: 'relative' }}>
                <Typography
                  variant="h4"
                  component="h1"
                  data-user-id={id}
                  style={{ marginBottom: '.5em', fontWeight: 600, paddingRight: 140 }}
                >
                  {userName ? userName : 'User Name'}
                </Typography>

                <Typography variant="body" component="p" style={{ display: 'flex', gap: '10px' }}>
                  <Email />
                  {email ? email : 'user@mail.com'}
                </Typography>

                <Button
                  variant="contained"
                  color="custom"
                  title="Edit user info"
                  sx={{ position: 'absolute', top: 0, right: 0, textTransform: 'none' }}
                  onClick={() => dispatch(toggleEditProfileForm(true))}
                >
                  Edit profile
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            {/*** Change password ***/}
            <Box sx={{ position: 'relative' }}>
              <Typography variant="body" component="p" style={{ marginBottom: 0, fontWeight: 600 }}>
                Change password
              </Typography>

              <Typography variant="body" component="p" sx={{ color: '#666', fontSize: 12 }}>
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
                  <Button type="submit" variant="contained" color="custom" sx={{ fontSize: 16, textTransform: 'none' }}>
                    Update password
                  </Button>
                </Form>
              </Formik>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/*** Delete account ***/}
            <Box sx={{ position: 'relative' }}>
              <Typography variant="body" component="p" style={{ marginBottom: 0, fontWeight: 600, color: '#d32f2f' }}>
                Delete account
              </Typography>

              <Typography variant="body" component="p" sx={{ fontSize: 12, color: '#666' }}>
                Once you delete your account, there is no going back. Please be certain. You may have to authenticate
                again for security reasons.
              </Typography>

              <Button
                className="btn"
                variant="contained"
                color="error"
                onClick={() => dispatch(toggleDeletePopup(true))}
              >
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

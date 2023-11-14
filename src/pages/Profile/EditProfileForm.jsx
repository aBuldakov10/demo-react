import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

// Files
import { editProfileValidation } from './validation';

// Firebase
import { app } from '../../constants/firebase';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';

// Store
import {
  confirmCredentialPopup,
  profileSuccessMessage,
  toggleEditProfileForm,
  updateUserInfo,
} from '../../store/auth/action';
import { userInfoSelector } from '../../store/auth/selectors';

// Components
import Text from '../../components/Form/Text';

const EditProfileForm = () => {
  const auth = getAuth(app);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userName, email } = useSelector(userInfoSelector); // Previous user info values

  // Validation
  const validationMessages = {
    required: t('profile.validation.required'),
    max: t('profile.validation.max'),
    characters: t('profile.validation.characters'),
  };

  /*** Handlers ***/
  // Upd user info function
  const handleUpdateProfile = async (newUserName, newEmail) => {
    const newUserInfo = {}; // Create obj for new user info

    // Upd user name method
    await updateProfile(auth.currentUser, {
      displayName: newUserName,
    })
      .then(() => (newUserInfo.newUserName = newUserName))
      .catch((error) => {});

    // Upd user mail method
    await updateEmail(auth.currentUser, newEmail)
      .then(() => {
        newUserInfo.newUserMail = newEmail;
        dispatch(updateUserInfo(newUserInfo)); // Update user info in store
        dispatch(toggleEditProfileForm(false)); // Close edit profile form
        dispatch(profileSuccessMessage(t('profile.edit-info.success'))); // Show success message
        setTimeout(() => dispatch(profileSuccessMessage()), 5000); // Hide success message
      })
      .catch((error) => dispatch(confirmCredentialPopup(true))); // Show confirm credential popup
  };
  const handleToggleEditForm = () => dispatch(toggleEditProfileForm(false));

  return (
    <Formik
      initialValues={{ newUserName: userName, newEmail: email }} // Set previous user info values
      validationSchema={editProfileValidation(validationMessages)}
      // New user info values goes to handleUpdateProfile as parameters
      onSubmit={({ newUserName, newEmail }) => handleUpdateProfile(newUserName, newEmail)}
    >
      <Form className="form edit-profile">
        <Field
          id="newUserName"
          name="newUserName"
          label={t('profile.new-username')}
          placeholder={t('profile.new-username-placeholder')}
          component={Text}
        />

        <Field
          id="newEmail"
          name="newEmail"
          label={t('profile.new-mail')}
          placeholder={t('profile.new-mail-placeholder')}
          component={Text}
        />

        <Box className="edit-profile__action">
          <Button
            className="btn"
            variant="contained"
            color="primary"
            title={t('profile.edit-info.confirm-button')}
            type="submit"
          >
            {t('profile.edit-info.confirm-button')}
          </Button>

          <Button
            className="btn"
            variant="contained"
            color="custom"
            title={t('profile.cancel')}
            type="button"
            onClick={handleToggleEditForm}
          >
            {t('profile.cancel')}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default EditProfileForm;

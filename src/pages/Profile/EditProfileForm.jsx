import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';

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
  const dispatch = useDispatch();
  const { userName, email } = useSelector(userInfoSelector); // Previous user info values

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
        dispatch(profileSuccessMessage('Saved successfully')); // Show success message
        setTimeout(() => dispatch(profileSuccessMessage()), 5000); // Hide success message
      })
      .catch((error) => dispatch(confirmCredentialPopup(true))); // Show confirm credential popup
  };

  return (
    <Formik
      initialValues={{ newUserName: userName, newEmail: email }} // Set previous user info values
      validationSchema={editProfileValidation}
      // New user info values goes to handleUpdateProfile as parameters
      onSubmit={({ newUserName, newEmail }) => handleUpdateProfile(newUserName, newEmail)}
    >
      <Form className="form">
        <Field id="newUserName" name="newUserName" label="New username" placeholder="New username" component={Text} />
        <Field id="newEmail" name="newEmail" label="New email" placeholder="New email" component={Text} />

        <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            title="Save changes"
            type="submit"
            sx={{ textTransform: 'none', width: 100 }}
          >
            Update
          </Button>

          <Button
            variant="contained"
            color="custom"
            title="Cancel"
            type="button"
            sx={{ textTransform: 'none', width: 100 }}
            onClick={() => dispatch(toggleEditProfileForm(false))}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

export default EditProfileForm;

import {
  AUTH_ERROR_MSG,
  NO_AUTH_ERROR_MSG,
  RESET_PASSWORD_REQUEST,
  TOGGLE_EDIT_FORM,
  SUCCESS_MESSAGE,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_STATE_ON_LOAD,
  UPDATE_USER_INFO,
  CREDENTIAL_POPUP,
  CREDENTIAL_SUCCESS_MESSAGE,
  TOGGLE_DELETE_POPUP,
} from './types';

// Delete auth error on change login and register pages, confirm credential popup also
export const noAuthError = () => {
  return {
    type: NO_AUTH_ERROR_MSG,
  };
};

// Set auth error in login and register pages, confirm credential popup also
export const authError = (errorMessage) => {
  return {
    type: AUTH_ERROR_MSG,
    message: errorMessage,
  };
};

// Set user info on login and registration
export const loginUser = (uid, username, email, accessToken, createdAt) => {
  return {
    type: USER_LOG_IN,
    id: uid,
    userName: username,
    email: email,
    createdAt: createdAt,
    token: accessToken,
  };
};

// Logout user
export const logoutUser = () => {
  return {
    type: USER_LOG_OUT,
  };
};

// Check user state on load
export const userLoggedInState = () => {
  return {
    type: USER_STATE_ON_LOAD,
  };
};

// Hide/Show reset password notification
export const resetPassword = (resetPasswordState) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    state: resetPasswordState,
  };
};

// Toggle edit profile form in profile page
export const toggleEditProfileForm = (editProfileFormState) => {
  return {
    type: TOGGLE_EDIT_FORM,
    state: editProfileFormState,
  };
};

// Toggle delete profile popup
export const toggleDeletePopup = (state) => {
  return {
    type: TOGGLE_DELETE_POPUP,
    state: state,
  };
};

// Toggle profile success message after update profile
export const profileSuccessMessage = (message) => {
  return {
    type: SUCCESS_MESSAGE,
    message: message,
  };
};

// Update user info in profile page
export const updateUserInfo = (newUserInfoObj) => {
  return {
    type: UPDATE_USER_INFO,
    newUserName: newUserInfoObj.newUserName,
    newUserMail: newUserInfoObj.newUserMail,
  };
};

// Hide/Show confirm credential popup if need reauthenticate for change password, email or delete account
export const confirmCredentialPopup = (state) => {
  return {
    type: CREDENTIAL_POPUP,
    state: state,
  };
};

// Toggle success message state after confirm credential in profile page
export const confirmCredentialSuccessMessage = (state) => {
  return {
    type: CREDENTIAL_SUCCESS_MESSAGE,
    state: state,
  };
};

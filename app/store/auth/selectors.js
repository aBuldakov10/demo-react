// Authentication error for login and password fields
export const authErrorSelector = ({ auth }) => {
  return auth.authError;
};

// Check if user is logged in
export const isAuthUserSelector = ({ auth }) => {
  return auth.isAuth;
};

// Reset password request state for notification
export const resetPasswordRequestSelector = ({ auth }) => {
  return auth.resetPasswordRequest;
};

// Get user info
export const userInfoSelector = ({ auth }) => {
  return auth.user;
};

// Edit user profile form state in profile page
export const editProfileFormSelector = ({ auth }) => {
  return auth.profile.editForm;
};

// Get delete profile popup state
export const deleteProfilePopupSelector = ({ auth }) => {
  return auth.profile.deletePopup;
};

// Profile success message
export const profileSuccessMessageSelector = ({ auth }) => {
  return auth.profile.successMessage;
};

// Confirm credential popup state in profile page
export const confirmCredentialPopupSelector = ({ auth }) => {
  return auth.confirmCredential.popup;
};

// Confirm credential success message in profile page
export const confirmCredentialSuccessMessageSelector = ({ auth }) => {
  return auth.confirmCredential.successMessage;
};

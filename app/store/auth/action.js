import {
  AUTH_ERROR_MSG,
  NO_AUTH_ERROR_MSG,
  RESET_PASSWORD_REQUEST,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_STATE_ON_LOAD,
} from './types';

export const noAuthError = () => {
  return {
    type: NO_AUTH_ERROR_MSG,
  };
};

export const authError = (errorMessage) => {
  return {
    type: AUTH_ERROR_MSG,
    message: errorMessage,
  };
};

export const loginUser = (uid, email, accessToken) => {
  return {
    type: USER_LOG_IN,
    id: uid,
    email: email,
    token: accessToken,
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOG_OUT,
  };
};

export const userLoggedInState = () => {
  return {
    type: USER_STATE_ON_LOAD,
  };
};

export const resetPassword = (resetPasswordState) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    state: resetPasswordState,
  };
};

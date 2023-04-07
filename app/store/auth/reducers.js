import {
  AUTH_ERROR_MSG,
  NO_AUTH_ERROR_MSG,
  RESET_PASSWORD_REQUEST,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_STATE_ON_LOAD,
} from './types';

const initialAuthState = {
  isAuth: false,
  authError: null,
  resetPasswordRequest: false,
  user: {
    id: null,
    email: null,
    token: null,
  },
};

export const authReducer = (state = initialAuthState, action) => {
  if (action.type === AUTH_ERROR_MSG) {
    return {
      ...state,
      authError: action.message,
    };
  }

  if (action.type === NO_AUTH_ERROR_MSG) {
    return {
      ...state,
      authError: null,
    };
  }

  if (action.type === USER_LOG_IN) {
    return {
      ...state,
      isAuth: true,
      user: {
        id: action.id,
        email: action.email,
        token: action.token,
      },
    };
  }

  if (action.type === USER_LOG_OUT) {
    return {
      ...state,
      isAuth: false,
      user: {
        id: null,
        email: null,
        token: null,
      },
    };
  }

  if (action.type === USER_STATE_ON_LOAD) {
    return {
      ...state,
      isAuth: true,
    };
  }

  if (action.type === RESET_PASSWORD_REQUEST) {
    return {
      ...state,
      resetPasswordRequest: action.state,
    };
  }

  return state;
};

import {
  AUTH_ERROR_MSG,
  NO_AUTH_ERROR_MSG,
  RESET_PASSWORD_REQUEST,
  TOGGLE_EDIT_FORM,
  UPDATE_USER_INFO,
  USER_LOG_IN,
  USER_LOG_OUT,
  USER_STATE_ON_LOAD,
  CREDENTIAL_POPUP,
  CREDENTIAL_SUCCESS_MESSAGE,
  SUCCESS_MESSAGE,
  TOGGLE_DELETE_POPUP,
} from './types';

const initialAuthState = {
  isAuth: false,
  authError: null,
  resetPasswordRequest: false,
  profile: {
    editForm: false,
    deletePopup: false,
    successMessage: false,
  },
  confirmCredential: {
    popup: false,
    successMessage: false,
  },
  user: {
    id: null,
    userName: null,
    email: null,
    createdAt: null,
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
        userName: action.userName || 'Unknown user',
        email: action.email,
        createdAt: action.createdAt,
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
        userName: null,
        email: null,
        createdAt: null,
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

  if (action.type === TOGGLE_EDIT_FORM) {
    return {
      ...state,
      profile: {
        ...state.profile,
        editForm: action.state,
      },
    };
  }

  if (action.type === TOGGLE_DELETE_POPUP) {
    return {
      ...state,
      profile: {
        ...state.profile,
        deletePopup: action.state,
      },
    };
  }

  if (action.type === SUCCESS_MESSAGE) {
    return {
      ...state,
      profile: {
        ...state.profile,
        successMessage: action.message || false,
      },
    };
  }

  if (action.type === UPDATE_USER_INFO) {
    return {
      ...state,
      user: {
        ...state.user,
        userName: action.newUserName,
        email: action.newUserMail,
      },
    };
  }

  if (action.type === CREDENTIAL_POPUP) {
    return {
      ...state,
      confirmCredential: {
        ...state.confirmCredential,
        popup: action.state,
      },
    };
  }

  if (action.type === CREDENTIAL_SUCCESS_MESSAGE) {
    return {
      ...state,
      confirmCredential: {
        ...state.confirmCredential,
        successMessage: action.state,
      },
    };
  }

  return state;
};

const namespace = 'AUTH';
const user = '_USER';
const profile = '_PROFILE';
const credential = '_CONFIRM_CREDENTIAL';

export const AUTH_ERROR_MSG = `${namespace}_ERROR_MSG`;
export const NO_AUTH_ERROR_MSG = `${namespace}_NO_ERROR_MSG`;
export const USER_LOG_IN = `${namespace}${user}_LOG_IN`;
export const USER_LOG_OUT = `${namespace}${user}_LOG_OUT`;
export const USER_STATE_ON_LOAD = `${namespace}${user}_STATE`;
export const RESET_PASSWORD_REQUEST = `${namespace}_RESET_PASSWORD_REQUEST`;
export const TOGGLE_EDIT_FORM = `${namespace}${profile}_TOGGLE_EDIT_FORM`;
export const TOGGLE_DELETE_POPUP = `${namespace}${profile}_TOGGLE_DELETE_POPUP`;
export const SUCCESS_MESSAGE = `${namespace}${profile}_SUCCESS_MESSAGE`;
export const UPDATE_USER_INFO = `${namespace}_UPDATE_USER_INFO`;
export const CREDENTIAL_POPUP = `${namespace}${credential}_POPUP`;
export const CREDENTIAL_SUCCESS_MESSAGE = `${namespace}${credential}_SUCCESS_MESSAGE`;

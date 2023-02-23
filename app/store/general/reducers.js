import { LOADED, LOADING } from './types';

export const generalReducer = (state = { loader: true }, action) => {
  if (action.type === LOADING) {
    return {
      ...state,
      loader: action.state,
    };
  }

  if (action.type === LOADED) {
    return {
      ...state,
      loader: action.state,
    };
  }

  return state;
};

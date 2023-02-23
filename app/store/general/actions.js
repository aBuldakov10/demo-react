import { LOADED, LOADING } from './types';

export const loading = () => {
  return {
    type: LOADING,
    state: true,
  };
};

export const loaded = () => {
  return {
    type: LOADED,
    state: false,
  };
};

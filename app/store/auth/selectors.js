export const authErrorSelector = ({ auth }) => {
  return auth.authError;
};

export const isAuthUserSelector = ({ auth }) => {
  return auth.isAuth;
};

export const resetPasswordRequestSelector = ({ auth }) => {
  return auth.resetPasswordRequest;
};

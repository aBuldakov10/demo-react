import * as yup from 'yup';

export const editProfileValidation = ({ max, characters, required }) => {
  return yup.object().shape({
    newUserName: yup.string().max(40, `${max} 40 ${characters}`).required(required),
    newEmail: yup.string().required(required),
  });
};

export const confirmCredentialValidation = ({ required }) => {
  return yup.object().shape({
    confirmEmail: yup.string().required(required),
    confirmPassword: yup.string().required(required),
  });
};

export const changePasswordValidation = ({ min, characters, required }) => {
  return yup.object().shape({
    newPassword: yup.string().min(6, `${min} 6 ${characters}`).required(required),
  });
};

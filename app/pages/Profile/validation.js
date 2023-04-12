import * as yup from 'yup';

export const editProfileValidation = yup.object().shape({
  newUserName: yup.string().max(40, 'Username must be at most 40 characters').required('This field is required'),
  newEmail: yup.string().required('This field is required'),
});

export const confirmCredentialValidation = yup.object().shape({
  confirmEmail: yup.string().required('This field is required'),
  confirmPassword: yup.string().required('This field is required'),
});

export const changePasswordValidation = yup.object().shape({
  newPassword: yup.string().min(6, 'Password must be at least 6 characters').required('This field is required'),
});

import * as yup from 'yup';

export const resetPasswordValidation = yup.object().shape({
  email: yup.string().required('This field is required'),
});

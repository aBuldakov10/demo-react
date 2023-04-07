import * as yup from 'yup';

export const registerValidation = yup.object().shape({
  email: yup.string().required('This field is required'),
  password: yup.string().min(6).required('This field is required'),
});

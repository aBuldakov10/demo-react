import * as yup from 'yup';

export const loginValidation = yup.object().shape({
  email: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
});

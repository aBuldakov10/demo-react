import * as yup from 'yup';

export const taskValidation = yup.object().shape({
  title: yup.string().min(4).max(30).required('This field is required'),
  description: yup.string().max(150),
});

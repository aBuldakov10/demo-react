import * as yup from 'yup';

export const loginValidation = ({ required }) => {
  return yup.object().shape({
    email: yup.string().required(required),
    password: yup.string().required(required),
  });
};

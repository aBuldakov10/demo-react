import * as yup from 'yup';

export const resetPasswordValidation = ({ required }) => {
  return yup.object().shape({
    email: yup.string().required(required),
  });
};

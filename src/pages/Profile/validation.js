import * as yup from 'yup';

export const changePasswordValidation = ({ min, characters, required }) => {
  return yup.object().shape({
    newPassword: yup.string().min(6, `${min} 6 ${characters}`).required(required),
  });
};

import * as yup from 'yup';

export const registerValidation = ({ min, characters, required }) => {
  return yup.object().shape({
    email: yup.string().required(required),
    password: yup.string().min(6, `${min} 6 ${characters}`).required(required),
  });
};

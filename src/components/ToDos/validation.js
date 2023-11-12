import * as yup from 'yup';

export const taskValidation = ({ required, min, max, characters }) => {
  return yup.object().shape({
    title: yup.string().min(5, `${min} 5 ${characters}`).max(30, `${max} 30 ${characters}`).required(required),
    description: yup.string().max(150, `${max} 150 ${characters}`),
  });
};

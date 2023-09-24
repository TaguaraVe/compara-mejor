import * as Yup from 'yup';

export const Schema = Yup.object().shape({
  user_name: Yup.string().required('Requerido'),
  email: Yup.string()
    .email('Email invalido')
    .typeError('Email invalido')
    .required('Requerido'),
  message: Yup.string()
    .min(10, 'Debe tener más de 10 letras')
    .required('Required'),
});

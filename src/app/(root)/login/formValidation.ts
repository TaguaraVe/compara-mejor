import * as Yup from 'yup';

import { regExp } from '@/libs/regExp';

export const Schema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalido')
    .typeError('Email invalido')
    .required('Requerido'),
  password: Yup.string()
    .matches(regExp.password, 'Clave invalida')
    .required('Required'),
});

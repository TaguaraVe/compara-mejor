import * as Yup from 'yup';

import { regExp } from '@/libs/regExp';

export const Schema = Yup.object().shape({
  newPwd: Yup.string()
    .matches(regExp.password, 'Clave invalida')
    .required('Required'),
  confirmPwd: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('newPwd'), null], 'Las contraseñas no coinciden'),
});

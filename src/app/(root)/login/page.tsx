'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Schema as schema } from './formValidation';
import { CustomInput } from '@/components/common/CustomInput';
import logo from '../../../../public/assets/images/logos/logo.png';
import { postLogin } from '@/libs/postLogin';
import { setUser } from '@/features/users/userSlice';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState({ isError: false, msg: '' });
  const router = useRouter();

  const onSubmit = async (values: FormData) => {
    setLoginError({ isError: false, msg: '' });
    const data = await postLogin(values);
    if (data.status !== 200) {
      setLoginError({ isError: true, msg: data.msg });
    } else {
      const { currentUser } = await postLogin(values);
      dispatch(setUser(currentUser));
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      reset();

      if (currentUser.name === 'Demo All' || currentUser.name === 'Test') {
        router.replace('/elmor');
      } else {
        router.replace('/viz');
      }
    }
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <section className="w-full min-h-[calc(100vh-var(--header-height))] bg-myPurple md:p-4">
      <div className="w-full h-full bg-login-pattern bg-contain bg-no-repeat bg-right-top">
        <div className="max-w-5xl mx-auto pt-12 px-2 flex justify-center lg:justify-start">
          <article className="max-h-[600px] max-w-[420px] w-full flex flex-col items-center bg-myGrayLight rounded-xl px-2 mb-12">
            <div className={'my-4'}>
              <div className="w-[160px] flex justify-center items-center mx-auto">
                <Image src={logo} alt="Compara Mejor logo" />
              </div>
            </div>
            <div className="h-8 w-full px-10 flex justify-center items-center">
              {loginError.isError && (
                <p className={'text-error font-semibold text-lg text-center'}>
                  {loginError.msg}
                </p>
              )}
            </div>
            <div className="w-full">
              <form
                className={'h-full w-full flex flex-col justify-center'}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="px-10">
                  <CustomInput
                    register={register}
                    error={errors?.email}
                    label="Email"
                    name="email"
                    placeholder="Ingrese correo"
                  />
                  <CustomInput
                    register={register}
                    error={errors?.password}
                    label="Clave"
                    name="password"
                    type={'password'}
                    placeholder="Ingrese su contraseña"
                  />
                </div>

                <button
                  className={
                    'w-3/5 text-xl mb-4 bg-myPurple hover:bg-myGrayLight border-2 border-myPurple py-2 px-10 mx-auto text-myWhite hover:text-myPurple'
                  }
                  type="submit"
                >
                  Ingresar
                </button>
              </form>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

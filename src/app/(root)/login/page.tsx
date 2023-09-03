'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Schema as schema } from './formValidation';
import { CustomInput } from '@/components/common/CustomInput';
import logo from '../../../../public/assets/images/logos/logo.png';
import { postLogin } from '@/libs/postLogin';
import { useRouter } from 'next/navigation';
import { mySubtitle, myTitle } from '@/app/layout';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [loginError, setLoginError] = useState({ isError: false, msg: '' });
  const router = useRouter();

  const onSubmit = async (values: FormData) => {
    setLoginError({ isError: false, msg: '' });
    const data = await postLogin(values);
    if (data.status !== 200) {
      setLoginError({ isError: true, msg: data.msg });
    } else {
      const { currentUser } = await postLogin(values);
      console.log('onSubmit Login', currentUser);
      // dispatch(setCurrentUser)
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      reset();
      router.replace('/balances');
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
    <section
      className={
        'relative w-full h-[calc(100vh-var(--header-height))] bg-login-pattern bg-cover bg-no-repeat bg-blend-overlay bg-[#2d2d2d]  bg-left-top md:py-4  md:pl-[10vw] flex flex-col justify-center items-center md:items-start'
      }
    >
      <article
        className={
          'h-[600px] max-w-[420px] w-full flex flex-col justify-center items-center bg-white rounded-xl'
        }
      >
        <div className={'my-4'}>
          <div
            className={
              'w-[300px] mb-12 flex justify-center items-center mx-auto'
            }
          >
            <Image src={logo} alt="emall-logo" />
          </div>
          <h2 className={`text-4xl text-center ${mySubtitle.className}`}>
            Gracias por volver
          </h2>
        </div>
        <div className="h-12 w-full px-10 flex justify-center items-center">
          {loginError.isError && (
            <p
              className={
                'bg-rose-100 text-[var(--ctaClr)] p-2 text-center w-full h-full'
              }
            >
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
                placeholder="Ingrese su contraseña"
              />
            </div>

            <button
              className={
                'w-3/5 text-xl my-[4] bg-ctaInv hover:bg-ctaInv/80 py-3 px-10 mx-auto text-white'
              }
              type="submit"
            >
              Ingresar
            </button>
          </form>
        </div>
        <p className={'text-sm text-[var(--saintBlue)] mt-6 '}>
          ¿No tienes una cuenta aun?{' '}
          <Link href="/register" className="">
            <span className="text-cta">Registrarse</span>
          </Link>
        </p>
      </article>
    </section>
  );
}

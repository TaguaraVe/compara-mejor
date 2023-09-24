'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Schema as schema } from './formValidation';

import emailjs from '@emailjs/browser';
import { CustomInput, CustomTextarea } from '@/components/common/CustomInput';

type FormData = {
  user_name: string;
  phone: string;
  email: string;
  company: string;
  location: string;
  message: string;
};

export const ContactForm = () => {
  const [isSending, setIsSending] = useState(false);

  const onSubmit = (values: FormData) => {
    setIsSending(true);
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID,
        values,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setIsSending(false);
          reset();
        },
        (err) => {
          console.log('FAILED...', err);
          setIsSending(false);
        }
      );
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      user_name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-myWhite">
        <CustomInput
          register={register}
          error={errors?.user_name}
          label="Nombre y Apellido"
          name="user_name"
          placeholder="Ingrese su nombre y apellido"
        />

        <CustomInput
          register={register}
          error={errors?.email}
          label="Email"
          name="email"
          placeholder="ingrese su Email"
        />

        <CustomInput
          register={register}
          error={errors?.phone}
          label="Teléfono"
          name="phone"
          placeholder="ingrese su teléfono incluir codigo país"
        />

        <CustomInput
          register={register}
          error={errors?.company}
          label="Nombre de la Empresa"
          name="company"
          placeholder="Ingrese el nombre de la empresa"
        />
      </div>

      <CustomTextarea
        register={register}
        error={errors?.message}
        name="message"
        placeholder="ingrese su mensaje o comentario"
      />
      <div className="mx-auto text-center">
        <button className="w-1/2 text-xl mb-4 bg-myPurple hover:bg-myGrayLight border-2 border-myPurple py-2 px-10 mx-auto text-myWhite hover:text-myPurple">
          Enviar
        </button>
      </div>
    </form>
  );
};

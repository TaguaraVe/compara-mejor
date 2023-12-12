'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { Schema as schema } from './formValidation';

import emailjs from '@emailjs/browser';
import { CustomInput, CustomTextarea } from '@/components/common/CustomInput';

type FormData = {
  user_name: string;
  email: string;
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
          setIsSending(false);
          toast.success('Gracias por su email!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
      message: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-myWhite lowercase">
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
      </div>

      <CustomTextarea
        register={register}
        error={errors?.message}
        name="message"
        placeholder="ingrese su mensaje o comentario"
      />
      <div className="mx-auto text-center">
        <button className="w-1/2 text-xl mb-4 bg-myPurple hover:bg-myGrayLight border-2 border-myPurple py-2 px-10 mx-auto text-myWhite hover:text-myPurple lowercase">
          Enviar
        </button>
      </div>
    </form>
  );
};

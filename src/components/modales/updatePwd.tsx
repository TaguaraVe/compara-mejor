'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Schema as schema } from './formValidation';
import { CustomInput } from '@/components/common/CustomInput';
import { postUpdateUser } from '@/libs/postLogin';
import { FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/users/userSlice';

interface FormData {
  newPwd: string;
  confirmPwd: string;
}

interface UpdatePwdProps {
  closeModal: () => void;
}

export const UpdatePwd = ({ closeModal }: UpdatePwdProps) => {
  const [loginError, setLoginError] = useState({ isError: false, msg: '' });
  const user = useSelector(selectCurrentUser);

  const onSubmit = async (values: FormData) => {
    setLoginError({ isError: false, msg: '' });
    const updatedUser = {
      id: user.id,
      password: values.newPwd,
    };
    const data = await postUpdateUser(updatedUser);
    if (data.status !== 200) {
      setLoginError({ isError: true, msg: data.msg });
    } else {
      closeModal();
    }
  };

  const handleCancel = () => {
    closeModal();
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newPwd: '',
      confirmPwd: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <section className="fixed inset-0 bg-myPurple bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-[150]  ">
      <article className="relative max-h-[600px] max-w-[420px] w-full flex flex-col items-center bg-myGrayLight rounded-xl p-8">
        <div
          className=" rounded-full cursor-pointer text-2xl text-myPurple  bg-myGrayDark hover:bg-opacity-70 p-2 absolute top-[12px] right-[12px]"
          onClick={handleCancel}
        >
          <FaTimes stroke="4" />
        </div>
        <div className="w-full">
          <form
            className={'h-full w-full flex flex-col justify-center'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-10">
              <CustomInput
                register={register}
                error={errors?.newPwd}
                label="Clave Nueva"
                name="newPwd"
                type={'password'}
                placeholder="Ingrese nueva clave"
              />
              <CustomInput
                register={register}
                error={errors?.confirmPwd}
                label="Confirmar Clave"
                name="confirmPwd"
                type={'password'}
                placeholder="Confirmar clave"
              />
            </div>

            <button
              className={
                'w-3/5 text-xl mb-4 bg-myPurple hover:bg-myGrayLight border-2 border-myPurple py-2 px-10 mx-auto text-myWhite hover:text-myPurple'
              }
              type="submit"
            >
              Actualizar
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

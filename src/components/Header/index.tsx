'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaEnvelope, FaHome, FaTimes, FaUserAlt } from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';
import { IoMdHappy } from 'react-icons/io';

import { removeUser, selectCurrentUser } from '@/features/users/userSlice';
import logo from '../../../public/assets/images/logos/logo.png';

const links = [
  {
    label: 'Inicio',
    icon: <FaHome />,
    size: 24,
    route: '/',
    show: '1',
  },
  {
    label: 'Beneficios',
    icon: <IoMdHappy />,
    size: 24,
    route: '/beneficios',
    show: '1',
  },
  {
    label: 'Nosotros',
    icon: <AiFillTool />,
    size: 24,
    route: '/nosotros',
    show: '1',
  },
  {
    label: 'Contacto',
    icon: <FaEnvelope />,
    size: 24,
    route: '/#contact',
    show: '1',
  },
];

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showModalPerfil, setShowModalPerfil] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const router = useRouter();

  const handleShowToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    dispatch(removeUser());

    setShowModalPerfil(false);
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleOpenModalProfile = () => {
    setShowModalPerfil(true);
  };

  const handleProfile = () => {
    setShowModalPerfil(false);
    router.push('/profile');
  };

  useEffect(() => {
    setShowMenu(false);
  }, []);

  return (
    <>
      <header>
        <button
          className="hover:text-primary-200 lg:hidden ml-4"
          onClick={handleShowToggleMenu}
        >
          {!showMenu ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
        <Link href="/">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" className="w-full h-auto" />
          </div>
        </Link>

        <nav className="flex lg:flex-row-reverse justify-between items-center">
          {user.id ? (
            <div className="flex space-x-2 ">
              <button
                className="w-8 h-8 md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px]  md:ml-12 bg-myGreen  hover:bg-myBlue rounded-full flex justify-center items-center text-base md:text-xl"
                onClick={() => handleOpenModalProfile()}
              >
                {user.name[0].toUpperCase()}
              </button>
            </div>
          ) : (
            <div className="flex space-x-2 ">
              <button
                className="hidden md:block btn btnSecond px-2"
                onClick={() => handleLogin()}
              >
                Ingresar
              </button>
              <button className="md:hidden" onClick={() => handleLogin()}>
                <FaUserAlt size={16} />
              </button>
            </div>
          )}
          <ul
            onClick={handleShowToggleMenu}
            className={`menuMobile ${
              showMenu ? 'translate-x-0' : '-translate-x-full'
            } lg:menuDesktop xl:-translate-x-36`}
          >
            {links.map((link) => {
              return (
                <li
                  className={`${
                    link.show === '2' ? 'lg:hidden' : ''
                  } headerLink`}
                  key={link.label}
                >
                  <Link
                    href={link.route}
                    className="flex space-x-2 items-center"
                  >
                    {link.icon} <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {showModalPerfil && (
        <div className="absolute bg-myGreen w-36 h-20 top-[var(--header-height)] right-10 p-4 text-white flex flex-col z-50">
          <button
            className="text-left font-semibold cursor-pointer hover:text-myBlue"
            onClick={handleProfile}
          >
            Perfil
          </button>
          <button
            className="text-left cursor-pointer hover:text-myBlue"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </>
  );
};

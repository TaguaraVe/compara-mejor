'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes, FaUserAlt } from 'react-icons/fa';

import { removeUser, selectCurrentUser } from '@/features/users/userSlice';
import logo from '../../../public/assets/images/logos/logo6.png';

const links = [
  {
    label: 'inicio',
    route: '/',
  },
  {
    label: 'beneficios',
    route: '/beneficios',
  },
  {
    label: 'contáctanos',
    route: '/#contact',
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
          <div className="relative w-[150px] h-[60px]  sm:w-[200px] sm:h-[80px] md:w-[270px] md:h-[104px] ">
            <Image src={logo} alt="Logo" height={110} width={290} />
          </div>
        </Link>

        <nav className="flex lg:flex-row-reverse justify-between items-center">
          {user.id ? (
            <div className="flex space-x-2 ">
              <button
                className="w-10 h-10 md:w-[40px] md:h-[40px] lg:w-[60px] lg:h-[60px]  md:ml-12 bg-myGrayLight  hover:bg-myGrayDark text-myPurple rounded-full flex justify-center items-center text-3xl"
                onClick={() => handleOpenModalProfile()}
              >
                {user.name[0].toUpperCase()}
              </button>
            </div>
          ) : (
            <div>
              <button
                className="hidden md:block headerLink"
                onClick={() => handleLogin()}
              >
                ingresar
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
                <li className="headerLink" key={link.label}>
                  <Link href={link.route}>{link.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {showModalPerfil && (
        <div className="absolute bg-myPurple w-36 h-20 top-[var(--header-height)] right-10 p-4 text-myGrayLight flex flex-col z-50">
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

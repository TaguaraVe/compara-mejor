'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaBars,
  FaEnvelope,
  FaHome,
  FaTimes,
  FaUserAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { AiFillTool } from 'react-icons/ai';
import { IoMdHappy } from 'react-icons/io';

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
    route: '/vehicles',
    show: '1',
  },
  {
    label: 'Nosotros',
    icon: <AiFillTool />,
    size: 24,
    route: '/about',
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
  const router = useRouter();

  const handleShowToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    console.log('logout');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  useEffect(() => {
    setShowMenu(false);
  }, []);

  return (
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
          <button
            className="hidden md:block btn px-2"
            onClick={() => handleRegister()}
          >
            Registrarse
          </button>
          <button className="md:hidden" onClick={() => handleRegister()}>
            <FaUserPlus size={20} />
          </button>
        </div>
        <ul
          onClick={handleShowToggleMenu}
          className={`menuMobile ${
            showMenu ? 'translate-x-0' : '-translate-x-full'
          } lg:menuDesktop xl:-translate-x-36`}
        >
          {links.map((link) => {
            return (
              <li
                className={`${link.show === '2' ? 'lg:hidden' : ''} headerLink`}
                key={link.label}
              >
                <Link href={link.route} className="flex space-x-2 items-center">
                  {link.icon} <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

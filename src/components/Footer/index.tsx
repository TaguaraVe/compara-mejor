import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

import logo from '../../../public/assets/images/logos/logo.png';

export const Footer = ({ id = 'footer' }) => {
  return (
    <footer className="" id={id}>
      <div className="max-w-6xl flex flex-col md:flex-row justify-between items-center mx-auto">
        <Link href="/">
          <div className="flex items-center">
            <Image src={logo} alt="Logo" className="w-full h-auto" />
          </div>
        </Link>
        <div className="flex flex-col justify-center items-center py-2 md:py-0 md:flex-row text-sm">
          <span> © 2023 - Desarrollado por Taguara Digital. </span>
          <span>Todos los derechos reservados</span>
        </div>

        <div className={'flex space-x-4 text-3xl'}>
          <a
            className={'hover:text-[var(--ctaClr)]'}
            href="https://www.facebook.com/SaintdeVenezuela/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            className={'hover:text-[var(--ctaClr)]'}
            href="https://www.instagram.com/saintve/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            className={'hover:text-[var(--ctaClr)]'}
            href="https://twitter.com/saintve"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

import Image from 'next/image';
import { ContactForm } from './contactForm';

export const ContactSection = () => {
  return (
    <section
      className="relative bg-myPurple flex justify-center items-center flex-col p-6 lowercase"
      id="contact"
    >
      <h1 className="title font-semibold text-center text-myGrayLight my-12">
        contáctanos
      </h1>
      <div className="w-full max-w-4xl bg-myWhite bg-opacity-10 px-2 md:px-10 lg:px-8 py-8 mx-auto mb-8 rounded-lg text-lg">
        <p className="mb-12 w-4/5 mx-auto text-lg md:text-2xl text-myWhite text-center">
          Déjanos tu mensaje y alguien de nuestro equipo se comunicará contigo a
          la brevedad posible
        </p>

        <ContactForm />
      </div>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-myWhite text-lg">
        <div className="grid grid-cols-1 px-2 md:px-10 py-4  gap-4  bg-myWhite bg-opacity-10 rounded-lg">
          <div className="flex items-center flex-col md:flex-row">
            <span>
              <Image
                src={'/assets/images/icons/mail.png'}
                alt="email icon"
                width={60}
                height={60}
                className="w-[60px] h-[60px] mb-4 md:mr-2 md:mb-0 "
              />
            </span>
            <span>ventas@comparamejor.top</span>
          </div>
        </div>
        <div className="grid grid-cols-1 px-2 md:px-10 py-4  gap-4  bg-myWhite bg-opacity-10 rounded-lg">
          <div className="flex items-center flex-col md:flex-row">
            <Image
              src={'/assets/images/icons/whatsapp.png'}
              alt="email icon"
              width={60}
              height={60}
              className="w-[60px] h-[60px] mb-4 md:mr-2 md:mb-0 "
            />
            <span>+58414 144.3988</span>
          </div>
        </div>
      </div>
    </section>
  );
};

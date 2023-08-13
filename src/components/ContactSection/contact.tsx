import Image from 'next/image';
import { ContactForm } from './contactForm';

export const Contact = () => {
  return (
    <section
      className="relative flex justify-center items-center flex-col p-6"
      id="contact"
    >
      <h1 className="title font-semibold text-center text-myYellow my-12">
        Contáctanos
      </h1>
      <div className="w-full max-w-4xl bg-myGreen bg-opacity-10 px-2 md:px-10 lg:px-8 py-8 mx-auto mb-8 rounded-lg text-lg">
        <p className="mb-12 w-4/5 mx-auto text-2xl">
          Déjanos tu mensaje y alguien de nuestro equipo se comunicará contigo a
          la brevedad posible
        </p>

        <ContactForm />
      </div>

      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-black text-lg">
        <div className="grid grid-cols-1 px-2 md:px-10 py-4  gap-4  bg-myGreen bg-opacity-10 rounded-lg">
          <div className="flex items-center">
            <span>
              <Image
                src={'/assets/images/icons/mail.png'}
                alt="email icon"
                width={60}
                height={60}
                className="w-[60px] h-[60px] mr-2 md:mr-4"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-base">Email</span>
              <span>ventas@comparamejor.cloud</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 px-2 md:px-10 py-4  gap-4  bg-myGreen bg-opacity-10 rounded-lg">
          <div className="flex items-center">
            <span>
              <Image
                src={'/assets/images/icons/whatsapp.png'}
                alt="email icon"
                width={60}
                height={60}
                className="w-[60px] h-[60px] mr-2 md:mr-4"
              />
            </span>
            <div className="flex flex-col">
              <span className="text-base">Whatsapp</span>
              <span>+58414 108.9756</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

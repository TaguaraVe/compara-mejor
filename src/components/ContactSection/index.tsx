import { contactData } from './contactData';
import ContactAddress from './ContactAddress';
import { Contact } from './contact';

export const ContactSection = ({ id = 'location', title = 'Ubicación' }) => {
  return (
    <section
      className={
        'w-full bg-[var(--lightClr)] py-20 px-8 flex justify-center items-center '
      }
      id={id}
    >
      <div className={'w-full flex flex-col justify-center items-center p-10'}>
        <h1 className={'title font-semibold mb-12'}>{title}</h1>
        <ContactAddress data={contactData[0]} />
        <div className="bg-[var(--saintBlue)] w-[300px] h-1 my-24 " />
        <ContactAddress data={contactData[1]} />

        <Contact />
      </div>
    </section>
  );
};

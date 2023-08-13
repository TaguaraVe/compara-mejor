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
        <Contact />
      </div>
    </section>
  );
};

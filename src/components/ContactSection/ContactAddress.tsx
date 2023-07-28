import Image from 'next/image';
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

import GoogleMapComponents from './googleMaps';
import logo from '../../../public/assets/images/logos/emall.png';

const ContactAddress = ({ data }) => {
  return (
    <div className={'grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4'}>
      <div className={'w-full'}>
        <div className="flex justify-start items-center">
          <Image src={logo} alt="Emall Logo" className={'w-[200px]'} />
          <Image
            src={data.flag}
            alt={`${data.country} flag`}
            className={'w-[70px]'}
          />
        </div>
        <h2 className="text-2xl font-semibold  ">{data.title}</h2>
        <p>
          <span className="font-semibold">{data.subtitle}</span>
        </p>
        <p>
          <span className="font-semibold">Representante :</span>
          {data.representative}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Dirección :</span> {data.address}
        </p>
        <p className="flex items-center mb-1 space-x-2">
          <span className="font-semibold">
            <FaPhone />
          </span>
          <span>{data.phone}</span>
        </p>
        <p className="flex items-center mb-1 space-x-2">
          <span className="font-semibold">
            <FaEnvelope />
          </span>
          <span>{data.email}</span>
        </p>
        {data.whaptsapp ? (
          <p className="flex items-center mb-1 space-x-2">
            <span className="font-semibold">
              <FaWhatsapp />
            </span>
            <span>{data.whaptsapp}</span>
          </p>
        ) : (
          ''
        )}
      </div>

      <div className={'w-full h-[400px] bg-[var(--saintOrange)] '}>
        <GoogleMapComponents location={data.location} />
      </div>
    </div>
  );
};

export default ContactAddress;

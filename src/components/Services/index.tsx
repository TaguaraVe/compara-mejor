import Image from 'next/image';
import { WhatWeDoCard } from './whatWeDoCard';
import { whatWeDoData } from './servicesData';

import Image1 from '../../../public/assets/images/icons/tag.png';
import Image2 from '../../../public/assets/images/icons/calendar.png';
import Image3 from '../../../public/assets/images/icons/store.png';

export const Services = () => {
  return (
    <section className="my-12 text-myPurple">
      <div className="max-w-7xl p-8 mx-auto">
        <h2 className="text-5xl text-myPurple my-12">QUE HACEMOS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatWeDoData.map((data) => {
            return (
              <WhatWeDoCard
                key={data.id}
                title={data.title}
                text={data.text}
                image={data.image}
              />
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl p-8 mx-auto">
        <h2 className="text-5xl text-myPurple my-12 text-right">
          COMO LO HACEMOS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-5xl text-myPurple flex justify-center items-center max-w-md">
            <p className="text-center">Lo que no se mide, no se mejora.</p>
          </div>
          <div className="pl-16">
            <div className="flex items-center mb-12">
              <Image src={Image1} alt={'image1'} width={100} height={100} />
              <div className="ml-8">
                <p className="text-3xl">+12.000 skus</p>
                <p>skus con seguimiento diario</p>
              </div>
            </div>
            <div className="flex items-center mb-12">
              <Image src={Image2} alt={'image1'} width={100} height={100} />
              <div className="ml-8">
                <p className="text-3xl">+6</p>
                <p>Meses de histórico de precios</p>
              </div>
            </div>
            <div className="flex items-center">
              <Image src={Image3} alt={'image1'} width={100} height={100} />
              <div className="ml-8">
                <p className="text-3xl">+50</p>
                <p>Puntos de Ventas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

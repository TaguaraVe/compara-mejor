import { WhatWeDoCard } from './whatWeDoCard';
import { whatWeDoData } from './servicesData';
import { HowWeDoCard } from './howWeDo';

export const Services = () => {
  return (
    <section className="my-12 text-myPurple">
      <div className="max-w-7xl p-8 mx-auto">
        <h2 className="text-5xl font-bold text-myPurple my-12">QUE HACEMOS</h2>
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

      <HowWeDoCard />
    </section>
  );
};

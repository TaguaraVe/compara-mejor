'use client';
import Image, { StaticImageData } from 'next/image';
import { motion, Variants } from 'framer-motion';
import { howWeDoData } from './servicesData';

export const HowWeDoCard = () => {
  const titleVariant: Variants = {
    initial: {
      opacity: 0,
    },
    final: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
  };

  const childrenVariant: Variants = {
    initial: {
      opacity: 0,
    },
    final: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index === 0 ? 0.5 : (index + 1) * 0.5,
        when: 'beforeChildren',
      },
    }),
  };

  return (
    <article className=" relative max-w-7xl p-8 mx-auto">
      <motion.h2
        className="relative text-5xl font-bold text-myPurple my-12 text-right"
        variants={titleVariant}
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
      >
        COMO LO HACEMOS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-5xl text-myPurple flex justify-center items-center">
          <p className="text-center font-bold">
            Lo que no se mide, <br /> no se mejora.
          </p>
        </div>
        <div className="md:pl-16">
          {howWeDoData.map((data, index) => {
            return (
              <motion.div
                className="flex items-center mb-12"
                key={data.id}
                variants={childrenVariant}
                initial="initial"
                whileInView="final"
                viewport={{ once: true }}
                custom={index}
              >
                <Image
                  src={data.image}
                  alt={'image1'}
                  width={100}
                  height={100}
                />
                <div className="ml-8">
                  <h3 className="text-4xl">{data.title}</h3>
                  <p className="text-lg">{data.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </article>
  );
};

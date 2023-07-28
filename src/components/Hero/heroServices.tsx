'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { sliderData } from './sliderData';
import { myTitle } from '@/app/layout';

export const HeroSection = () => {
  const router = useRouter();
  const params = useParams();
  const slide = sliderData.filter((card) => card.alt === params.area)[0];

  return (
    <section className="relative overflow-hidden bg-primary-800 h-[850px] w-full">
      <div className="relative flex">
        <div className="min-w-full overflow-hidden duration-500 ease-linear">
          <div className="h-[850px] w-full relative">
            <Image
              className="hidden lg:block object-cover object-top  mix-blend-overlay"
              fill
              src={slide.image}
              alt={slide.alt}
            />
            <Image
              className="hidden sm:block lg:hidden object-cover object-top  mix-blend-overlay"
              fill
              src={slide.imageTable}
              alt={slide.alt}
            />
            <Image
              className=" sm:hidden object-cover object-top mix-blend-overlay"
              fill
              src={slide.imageMobile}
              alt={slide.alt}
            />

            <div className={`flex flex-col w-full h-full px-4`}>
              <div
                className={`text-center sm:ml-8 lg:ml-16 ${
                  slide.txtPosition === 'center'
                    ? 'sm:text-left mt-28 md:mt-[250px] md:text-center'
                    : 'sm:text-left mt-28'
                }`}
              >
                <h1
                  className={`text-3xl tracking-wide md:text-6xl font-bold mb-6 ${myTitle.className}`}
                >
                  {slide.title}
                </h1>
                <h2
                  className={`mb-6 text-2xl lg:text-4xl md:max-w-2xl ${
                    slide.txtPosition === 'center' ? 'mx-auto' : ''
                  }`}
                >
                  {slide.subtitle}
                </h2>
              </div>
              <div
                className={`self-center sm:ml-8 lg:ml-16 z-10 ${
                  slide.txtPosition === 'center'
                    ? 'self-center'
                    : 'sm:self-start'
                }`}
              >
                <button
                  className="btn px-20 py-2 text-white bg-myGreen hover:bg-myGreenHover"
                  onClick={() => router.push(slide.route)}
                >
                  {slide.btnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

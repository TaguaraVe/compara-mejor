'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import { sliderData } from './sliderData';
import { Tahoma, mySubtitle, myTitle } from '@/app/layout';

export const HeroSliderSection = () => {
  const slideshow = useRef(null);
  const router = useRouter();

  const autoScroll = true;
  let intervalTime = 5000;
  let slideInterval: NodeJS.Timer;

  const autoAdvance = () => {
    slideInterval = setInterval(nextSlide, intervalTime);
  };

  const nextSlide = () => {
    if (slideshow.current.children.length > 0) {
      const firstSlide = slideshow.current.children[0];
      slideshow.current.style.transition = `2s linear all`;
      slideshow.current.style.transform = `translateX(-100%)`;

      const transition = () => {
        slideshow.current.style.transition = `none`;
        slideshow.current.style.transform = `translateX(0)`;
        slideshow.current.appendChild(firstSlide);
        slideshow.current.removeEventListener('transitionend', transition);
      };

      slideshow.current.addEventListener('transitionend', transition);
    }
  };

  const prevSlide = () => {
    if (slideshow.current.children.length > 0) {
      const lastSlide =
        slideshow.current.children[slideshow.current.children.length - 1];

      slideshow.current.insertBefore(lastSlide, slideshow.current.firstChild);
      slideshow.current.style.transition = 'none';
      const tamañoSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `2s linear all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if (autoScroll) {
      autoAdvance();
    }
    return () => {
      clearInterval(slideInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative flex flex-nowrap" ref={slideshow}>
        {sliderData.map((slide, i) => {
          return (
            <div
              className="relative z-10 min-w-full overflow-hidden duration-500 ease-linear"
              key={i}
            >
              <div className=" absolute top-1/2 translate-x-1/2 right-1/2 -translate-y-1/2 flex flex-col justify-center items-center  bg-slate-100 bg-opacity-70 z-10 w-2/5 h-20 md:h-44 p-8  rounded-2xl mx-auto  text-clamped leading-none text-[var(--darkClr)] ">
                <h2 className={`mx-auto text-center ${myTitle.className}`}>
                  {slide.title}
                </h2>

                <h3 className={`mx-auto text-center ${mySubtitle.className}`}>
                  {slide.subtitle}
                </h3>
              </div>
              <div className="relative w-full h-full">
                <Image
                  className="w-full bg-cover"
                  width={1440}
                  height={900}
                  src={slide.image}
                  alt={slide.alt}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`absolute top-1/2 -translate-y-1/2 flex z-[100] text-[var(--ctaClr)] w-full justify-between px-4 md:px-10 `}
      >
        <IoArrowBack
          className={`w-8 md:w-12 h-8 md:h-12 p-1 md:p-2 bg-white bg-opacity-70 rounded-full cursor-pointer `}
          onClick={prevSlide}
        />
        <IoArrowForward
          className={`w-8 md:w-12 h-8 md:h-12 p-1 md:p-2 bg-white bg-opacity-70 rounded-full cursor-pointer `}
          onClick={nextSlide}
        />
      </div>
    </section>
  );
};

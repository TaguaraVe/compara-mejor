'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

import { sliderData } from './sliderData';

export const HeroSliderSection = () => {
  const slideshow = useRef(null);
  const router = useRouter();

  const autoScroll = true;
  let intervalTime = 15000;
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
              <div className="relative w-full h-full bg-red-600">
                <Image
                  className="w-full"
                  width={1400}
                  height={600}
                  src={slide.image}
                  alt={slide.alt}
                />
                <div
                  className={`absolute w-2/5 z-20 top-[30%]  text-clamped leading-none text-[var(--darkClr)] ${
                    slide.side === 'right' ? 'right-24 text-right' : 'left-24'
                  }`}
                >
                  <h2>{slide.title}</h2>
                  {i > 0 && (
                    <div className="flex justify-center items-center mt-4 space-x-8">
                      <a
                        className="hover:text-[var(--ctaClr)]"
                        href="https://www.facebook.com/SaintdeVenezuela/"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Facebook"
                      >
                        <FaFacebook />
                      </a>
                      <a
                        className="hover:text-[var(--ctaClr)]"
                        href="https://www.instagram.com/saintve/"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Instagram"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        className="hover:text-[var(--ctaClr)]"
                        href="https://twitter.com/saintve"
                        rel="noopener noreferrer"
                        target="_blank"
                        aria-label="Twitter"
                      >
                        <FaTwitter />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`absolute bottom-1/2 flex z-[100] text-[var(--ctaClr)] w-full justify-between px-4 md:px-10 `}
      >
        <IoArrowBack
          className={`w-8 md:w-12 h-8 md:h-12 p-1 md:p-2 bg-black bg-opacity-70 rounded-full cursor-pointer `}
          onClick={prevSlide}
        />
        <IoArrowForward
          className={`w-8 md:w-12 h-8 md:h-12 p-1 md:p-2 bg-black bg-opacity-70 rounded-full cursor-pointer `}
          onClick={nextSlide}
        />
      </div>
    </section>
  );
};

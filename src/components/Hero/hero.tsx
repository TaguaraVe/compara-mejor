'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
export const Hero = () => {
  return (
    <section className=" relative bg-myPurple h-[550px] flex-col flex justify-center items-center">
      <motion.h1
        animate={{ y: 0 }}
        initial={{ opacity: 0, y: 250 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl lg:text-8xl w-1/2 font-bold text-center text-myWhite "
      >
        acelera tu análisis de
        <span className="text-myGrayLight">
          <br /> datos
        </span>
      </motion.h1>

      <Link href="/#contact">
        <button className="py-2 px-4 md:py-4 md:px-12 max-w-sm mx-auto mt-12 border-2 border-myWhite text-myWhite  md:text-2xl hover:text-myPurple hover:border-myPurple hover:bg-myWhite ">
          consulta con nosotros
        </button>
      </Link>
    </section>
  );
};

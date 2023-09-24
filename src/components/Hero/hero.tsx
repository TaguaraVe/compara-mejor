'use client';
import { motion } from 'framer-motion';
export const Hero = () => {
  return (
    <section className=" relative bg-myPurple h-[550px] flex-col flex justify-center items-center">
      <motion.h1
        animate={{ y: 0 }}
        initial={{ opacity: 0, y: 250 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-8xl w-1/2 font-bold text-center text-myWhite "
      >
        Acelera tu análisis de
        <span className="text-myGrayDark">
          <br /> Datos
        </span>
      </motion.h1>
      <button className="py-4 px-12 mt-12 border-2 border-myWhite text-myWhite text-2xl">
        Consulta con nosotros
      </button>
    </section>
  );
};

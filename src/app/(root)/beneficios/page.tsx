import { mySubtitle } from '@/app/layout';
import React from 'react';

const Beneficts = () => {
  return (
    <section className="">
      <h1
        className={`${mySubtitle.className} pt-12 text-center text-6xl text-myGreen mb-12 `}
      >
        Beneficios
      </h1>
      <div className="px-4 grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-lg ">
        <div className="w-full min-h-[300px] p-8 bg-white rounded-lg">
          <h3
            className={`font-bold text-2xl my-4 text-center  text-myGreen ${mySubtitle.className}`}
          >
            Mejora en toma de decisiones
          </h3>
          <p className="">
            Al analizar grandes volúmenes de datos, se pueden identificar
            patrones, tendencias y relaciones que ayudan a comprender el
            rendimiento del negocio y a tomar decisiones más acertadas
          </p>
        </div>
        <div className="w-full min-h-[300px] p-8 bg-white rounded-lg">
          <h3
            className={`font-bold text-2xl my-4 text-center  text-myGreen ${mySubtitle.className}`}
          >
            Optimización de procesos
          </h3>
          <p>
            Se pueden detectar áreas de mejora y aplicar cambios que optimicen
            los procedimientos, lo que puede conducir a una mayor eficiencia,
            reducción de costos y aumento de la productividad
          </p>
        </div>
        <div className="w-full min-h-[300px] p-8 bg-white rounded-lg">
          <h3
            className={`font-bold text-2xl my-4 text-center  text-myGreen ${mySubtitle.className}`}
          >
            Oportunidades de crecimiento
          </h3>
          <p>
            Al examinar los datos internos y externos, se pueden identificar
            nuevos segmentos de mercado, tendencias emergentes y áreas de
            negocio potenciales
          </p>
        </div>
      </div>
    </section>
  );
};

export default Beneficts;

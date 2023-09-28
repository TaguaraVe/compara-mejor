const Beneficts = () => {
  return (
    <section className="text-myPurple lowercase bg-myWhite">
      <h1 className="title font-semibold text-center my-12">Beneficios</h1>

      <div className="px-4 grid gap-8 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-lg ">
        <div className="w-full min-h-[300px] p-8 bg-myWhite rounded-lg">
          <h3 className={`font-bold text-2xl my-4 text-center`}>
            Mejora en toma de decisiones
          </h3>
          <p>
            Al analizar grandes volúmenes de datos, se pueden identificar
            patrones, tendencias y relaciones que ayudan a comprender el
            rendimiento del negocio y a tomar decisiones más acertadas
          </p>
        </div>
        <div className="w-full min-h-[300px] p-8 bg-myWhite rounded-lg">
          <h3 className={`font-bold text-2xl my-4 text-center`}>
            Optimización de procesos
          </h3>
          <p>
            Se pueden detectar áreas de mejora y aplicar cambios que optimicen
            los procedimientos, lo que puede conducir a una mayor eficiencia,
            reducción de costos y aumento de la productividad
          </p>
        </div>
        <div className="w-full min-h-[300px] p-8 bg-myWhite rounded-lg">
          <h3 className={`font-bold text-2xl my-4 text-center  text-myGreen `}>
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

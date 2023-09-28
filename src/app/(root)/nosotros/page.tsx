const About = () => {
  return (
    <section className="lowercase  text-myPurple bg-myWhite ">
      <h1 className="title font-semibold text-center my-12">QUIENES SOMOS</h1>

      <div className="flex flex-col max-w-6xl mx-auto text-xl ">
        <p className="mb-4">
          En <span className="font-semibold  text-2xl"> Compara Mejor </span>
          somo un grupo joven con amplia experiencia en el en modelado de datos,
          analítica descriptiva y predictiva.
        </p>
        <p className="mb-4">
          Brindamos consultoría de alto nivel a nuestros clientes. Somos un
          equipo de expertos en análisis de datos que han ayudado a empresas en
          toda Venezuela a tomar mejores decisiones basadas en la mejor gestión
          de sus datos.
        </p>
        <p className="mb-4">
          En nuestra empresa, nos especializamos en ayudar a las empresas a
          tomar mejores decisiones mediante el uso del análisis de datos.
        </p>
        <p className="mb-4">
          Reconocemos que los datos son un activo valioso y, a través de
          técnicas avanzadas de análisis, nos dedicamos a extraer información
          significativa de conjuntos de datos complejos.
        </p>
        <p className="mb-4">
          Trabajamos en estrecha colaboración con nuestros clientes para
          comprender sus objetivos y desafíos comerciales, y luego aplicamos
          nuestro conocimiento y experiencia en análisis de datos para ofrecer
          ideas y recomendaciones accionables.
        </p>
        <p className="mb-4">
          Utilizamos técnicas estadísticas, modelos predictivos y herramientas
          de visualización de datos para identificar patrones, tendencias y
          relaciones clave en los datos. Al proporcionar información clara y
          basada en evidencia, capacitamos a las empresas para tomar decisiones
          informadas y estratégicas que impulsen el crecimiento, optimicen las
          operaciones y maximicen los resultados empresariales.
        </p>
      </div>

      <div className="bg-about-pattern bg-opacity-80 bg-cover bg-center bg-no-repeat bg-blend-overlay bg-myBlue my-12  ">
        <div className="flex max-w-6xl mx-auto gap-12 text-2xl">
          <div className="w-full min-h-[300px] p-8">
            <h3 className={`text-5xl my-4 font-semibold text-center`}>
              Misión
            </h3>
            <p>
              Mediante plataformas tecnológicas ágiles ayudamos a las empresas
              en la transformación digital para tomar decisiones basadas en
              datos.
            </p>
          </div>
          <div className="w-full min-h-[300px] p-8 rounded-lg">
            <h3 className={`text-5xl my-4 font-semibold text-center`}>
              Visión
            </h3>
            <p>
              Ser un aliado estratégico para acelerar la implementación de la
              transformación digital de cada uno de nuestros clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

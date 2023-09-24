type Props = {};

export const Hero = (props: Props) => {
  return (
    <section className="bg-myPurple h-[550px] flex-col flex justify-center items-center">
      <h1 className="text-8xl w-1/2 tracking-widest font-bold text-center text-myWhite ">
        Acelera tu análisis de
        <span className="text-myGrayDark">
          <br /> Datos
        </span>
      </h1>
      <button className="py-4 px-12 mt-12 border-2 border-myWhite text-myWhite text-2xl">
        Consulta con nosotros
      </button>
    </section>
  );
};

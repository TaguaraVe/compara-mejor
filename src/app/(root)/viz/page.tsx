import Script from 'next/script';

const Tableau = () => {
  return (
    <section>
      <div className="w-[90vw] h-screen bg-slate-100 mx-auto  ">
        <tableau-viz
          id="tableauViz"
          // src="https://public.tableau.com/views/DeveloperSuperstore/Overview"
          src="https://prod-useast-b.online.tableau.com/#/site/taguaracomparamejor/views/superstore-live/Ventasportrimetresymes?:iid=2"
          toolbar="bottom"
          hide-tabs
        ></tableau-viz>
      </div>
      <Script
        type="module"
        src="https://prod-useast-b.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
      ></Script>
    </section>
  );
};

export default Tableau;

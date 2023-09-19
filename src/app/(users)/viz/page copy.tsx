'use client';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const allViews = [
  {
    role: 'Visit',
    views: [
      'https://prod-useast-a.online.tableau.com/t/jml2/views/STAGINGPlazasv1/ComparadordePrecios',
      'https://prod-useast-a.online.tableau.com/t/jml2/views/STAGINGPlazasv1/Home',
      'https://prod-useast-a.online.tableau.com/t/jml2/views/STAGINGPlazasv1/ComparadordeCatalogo',
    ],
  },
  {
    role: 'Admin',
    views: [
      'https://prod-useast-a.online.tableau.com/#/site/jml2/views/2023-7-20comparamejorsql/Home?:origin=card_share_link&:embed=n',
      'https://prod-useast-a.online.tableau.com/#/site/jml2/views/2023-7-20comparamejorsql/ComparadordeCatalogo?:origin=card_share_link&:embed=n',
      'https://prod-useast-a.online.tableau.com/#/site/jml2/views/2023-7-20comparamejorsql/ComparadordePrecios?:origin=card_share_link&:embed=n',
    ],
  },
];

const Tableau = () => {
  const [current, setCurrent] = useState(0);
  const [vista, setVista] = useState(allViews[0].views);
  const user =
    typeof window !== 'undefined' && sessionStorage.getItem('currentUser')
      ? JSON.parse(sessionStorage.getItem('currentUser'))
      : '';

  useEffect(() => {
    if (user !== '' && user.role === 'Admin') {
      setVista(allViews[1].views);
    }
  }, []);

  const nextViz = () => {
    current + 1 > vista.length ? setCurrent(0) : setCurrent(current + 1);
  };

  return (
    <section>
      <div className="flex justify-center items-center p-2">
        <button className="text-2xl px-4 py-2 bg-slate-100" onClick={nextViz}>
          Proxima vista
        </button>
      </div>
      <div className="w-[90vw] h-screen bg-slate-100 mx-auto  ">
        <tableau-viz
          id="tableauViz"
          // src="https://public.tableau.com/views/DeveloperSuperstore/Overview"
          src={vista[current]}
          toolbar="bottom"
          hide-tabs
        ></tableau-viz>
      </div>
      <Script
        type="module"
        src="https://prod-useast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
      ></Script>
    </section>
  );
};

export default Tableau;

// <script type='module' src='https://prod-useast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://prod-useast-a.online.tableau.com/t/jml2/views/STAGINGPlazasv1/Home' width='1000' height='840' hide-tabs toolbar='bottom' ></tableau-viz>

// <script type='module' src='https://prod-useast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://prod-useast-a.online.tableau.com/t/jml2/views/STAGINGPlazasv1/ComparadordeCatalogo' width='1000' height='840' hide-tabs toolbar='bottom' ></tableau-viz>

// }<script type='module' src='https://prod-useast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js'></script><tableau-viz id='tableau-viz' src='https://prod-useast-a.online.tableau.com/t/jml2/views/STAGINGPlazasv1/ComparadordePrecios' width='1000' height='840' hide-tabs toolbar='bottom' ></tableau-viz>

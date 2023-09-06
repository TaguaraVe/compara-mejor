'use client';
import { useEffect, useRef } from 'react';
import Script from 'next/script';

const Tableau = () => {
  const ref = useRef(null);
  const URL = 'https://public.tableau.com/views/DeveloperSuperstore/Overview';

  const initViz = () => {
    new tableau.Viz(ref.current, URL, {
      width: '100%',
      height: '100%',
    });
  };

  useEffect(() => {
    initViz();
  }, []);

  return (
    <section>
      <div className="w-full min-h-screen flex flex-col justify-center items-center  ">
        <div ref={ref} />
      </div>
      <Script
        type="module"
        src="https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
      ></Script>
    </section>
  );
};

export default Tableau;

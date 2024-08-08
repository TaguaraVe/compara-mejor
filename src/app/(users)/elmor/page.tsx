'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Script from 'next/script';

import { getAllUserVizById } from '@/libs/getUserViz';
import { selectCurrentUser } from '@/features/users/userSlice';

export async function getTableaToken() {
  const apiUrl = 'https://tableau-token-generator.vercel.app/token';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos de la API:', error);
  }
}

const Tableau = () => {
  const [current, setCurrent] = useState(0);
  const [vista, setVista] = useState([]);
  const [vizName, setVizName] = useState([]);
  const [token, setToken] = useState(null);

  const apiUrl = 'https://tableau-token-generator.vercel.app/token';

  const getToken = async () => {
    try {
      const respuesta = await fetch(apiUrl);
      const data = await respuesta.json();
      setToken(data.token);
    } catch (error) {
      console.error('Hubo un error al obtener los datos:', error);
    }
  };

  const user = useSelector(selectCurrentUser);

  const getUserViz = async (id: string) => {
    const vartoken = await getTableaToken();
    setToken(vartoken.token);
    const views = await getAllUserVizById(id);
    if (views.status === 200) {
      setVista(views.viewsByFilter[0]);
      setVizName(views.namesByFilter[0]);
    }
  };

  useEffect(() => {
    getToken();
    const intervalId = setInterval(getToken, 9 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (user !== '') {
      getUserViz(user.id);
    }
  }, [user]);

  const nextViz = () => {
    current + 1 > vista.length ? setCurrent(0) : setCurrent(current + 1);
  };

  return (
    <section className="bg-myWhite">
      <div className="flex flex-col justify-center items-center p-2">
        <h1 className="text-myPurple  text-2xl ">Hola {user.name}</h1>
      </div>

      {vizName?.length > 0 && (
        <div className="w-[90vw] min-h-screen bg-slate-100 mx-auto  ">
          <tableau-viz
            id="tableauViz"
            src={vista[current]}
            token={token}
            toolbar="bottom"
            hide-tabs
          ></tableau-viz>
        </div>
      )}

      <Script
        type="module"
        src="https://prod-useast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
      ></Script>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RT8CNZEZRE" />

      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-RT8CNZEZRE');
        `}
      </Script>
    </section>
  );
};

export default Tableau;

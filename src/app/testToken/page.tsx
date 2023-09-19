'use client';
import { useEffect, useState } from 'react';

export default function TestToken() {
  const [token, setToken] = useState(null);
  const [cont, setCont] = useState(0);

  const apiUrl = 'https://tableau-token-generator.vercel.app/token';
  const obtenerDatos = async () => {
    try {
      const respuesta = await fetch(apiUrl);
      const data = await respuesta.json();
      setCont((pre) => pre + 1);
      setToken({ ...data, cont });
      console.log('joder', token);
    } catch (error) {
      console.error('Hubo un error al obtener los datos:', error);
    }
  };
  useEffect(() => {
    obtenerDatos();

    const intervalId = setInterval(obtenerDatos, 1 * 10 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(token, null, 2)}</pre>
    </div>
  );
}

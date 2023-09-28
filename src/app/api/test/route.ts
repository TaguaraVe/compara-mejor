import { NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const userWithVizs = await prismadb.user.findUnique({
    where: {
      id,
    },
    select: {
      vizGroup: {
        select: {
          vizs: {
            select: {
              tableauViz: {
                select: {
                  name: true,
                  url: true,
                  order_name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Extraer la data de las visualizaciones de Tableau asociadas al usuario
  const vizData =
    userWithVizs?.vizGroup?.vizs.map((v) => {
      return {
        order_name: v.tableauViz.order_name,
        name: v.tableauViz.name,
        url: v.tableauViz.url,
      };
    }) || [];

  return NextResponse.json({ status: 200, vizData });
}

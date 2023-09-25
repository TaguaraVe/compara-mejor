import { NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const userWithVizes = await prismadb.user.findUnique({
    where: {
      id,
    },
    include: {
      tableauVizes: {
        select: {
          tableaViz: {
            select: {
              url: true,
              name: true,
              order_name: true,
            },
          },
        },
        orderBy: {
          tableaViz: {
            order_name: 'asc', // puedes usar 'desc' para orden descendente
          },
        },
      },
    },
  });

  // Extraer la data de las visualizaciones de Tableau asociadas al usuario
  const vizData =
    userWithVizes?.tableauVizes.map((relation) => ({
      url: relation.tableaViz.url,
      name: relation.tableaViz.name,
      order: relation.tableaViz.order_name,
    })) || [];

  return NextResponse.json({ status: 200, vizData });
}

import { NextResponse } from 'next/server';

import { prismadb } from '@/libs/prismadb';

export async function GET(req: Request) {
  const allViz = await prismadb.tableauViz.findMany({});

  return NextResponse.json({ status: 200, allViz });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id } = body;

  const usuarioId = id;

  const vistasDelUsuario = await prismadb.vizGroupToTableauViz.findMany({
    where: {
      vizGroup: {
        users: {
          some: {
            id: usuarioId,
          },
        },
      },
    },
    include: {
      tableauViz: true,
      vizGroup: true,
    },
  });

  const menuFilters = Array.from(
    new Set(vistasDelUsuario.map((item) => item.groupNameFilter))
  );

  // Array para almacenar las vistas correspondientes a cada groupNameFilter, ordenadas por order_name
  const viewsByFilter = menuFilters.map((filter) =>
    vistasDelUsuario
      .filter((item) => item.groupNameFilter === filter)
      .sort((a, b) => a.tableauViz.order_name - b.tableauViz.order_name)
      .map((item) => item.tableauViz.url)
  );

  // Array para almacenar los nombres de las vistas correspondientes a cada groupNameFilter, ordenados por order_name
  const namesByFilter: Array<string[]> = menuFilters.map((filter) =>
    vistasDelUsuario
      .filter((item) => item.groupNameFilter === filter)
      .sort((a, b) => a.tableauViz.order_name - b.tableauViz.order_name)
      .map((item) => item.tableauViz.name)
  );

  const userWithVizs = await prismadb.user.findUnique({
    where: {
      id,
    },
    select: {
      vizGroup: {
        select: {
          vizs: {
            orderBy: {
              tableauViz: {
                order_name: 'asc',
              },
            },
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

  const vizUrls =
    userWithVizs?.vizGroup?.vizs.map((v) => {
      return v.tableauViz.url;
    }) || [];

  const vizName =
    userWithVizs?.vizGroup?.vizs.map((v) => {
      return v.tableauViz.name;
    }) || [];

  return NextResponse.json({
    status: 200,
    vizUrls,
    vizName,
    menuFilters,
    viewsByFilter,
    namesByFilter,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    const viz = await prismadb.tableauViz.findFirst({
      where: {
        url,
      },
    });

    if (viz) {
      return NextResponse.json({
        status: 400,
        success: false,
        msg: 'Error --> Vista ya creada',
      });
    }

    const newViz = await prismadb.tableauViz.create({
      data: { ...body },
    });

    return NextResponse.json({ status: 200, newViz });
  } catch (error) {
    console.log('[VIEWS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

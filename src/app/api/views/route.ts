import { NextResponse } from 'next/server';

import { prismadb } from '@/libs/prismadb';

export async function GET(req: Request) {
  const allViz = await prismadb.tableauViz.findMany({});

  return NextResponse.json({ status: 200, allViz });
}

export async function PUT(req: Request) {
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
  const vizUrls =
    userWithVizes?.tableauVizes.map((relation) => relation.tableaViz.url) || [];

  const vizName =
    userWithVizes?.tableauVizes.map((relation) => relation.tableaViz.name) ||
    [];

  return NextResponse.json({ status: 200, vizUrls, vizName });
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

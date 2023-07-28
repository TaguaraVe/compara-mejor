import { NextResponse } from 'next/server';

import { prismadb } from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return new NextResponse('El nombre es requerido', { status: 400 });
    }

    const store = await prismadb.paises.create({
      data: {
        pais_id: 1,
        pais_name: 'Venezuela',
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

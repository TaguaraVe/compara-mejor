import { NextRequest, NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';

export async function GET(req: Request) {
  // Extraer la data de las visualizaciones de Tableau asociadas al usuario

  return NextResponse.json({ data: 'Prueba Superada' });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  const users = await prismadb.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  // Extraer la data de las visualizaciones de Tableau asociadas al usuario

  return NextResponse.json({ status: 200, users });
}

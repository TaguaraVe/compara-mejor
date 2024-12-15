import { NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  console.log('Ruta variableo date = ', date);

  return NextResponse.json({ data: 'Variable Que bueno eres Youssef' });
}
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { name } = body;

//     if (!name) {
//       return new NextResponse('El país es requerido', { status: 400 });
//     }

//     return NextResponse.json(store);
//   } catch (error) {
//     console.log('[COUNTRY_POST]', error);
//     return new NextResponse('Internal error', { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { prismadb } from '@/libs/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    const market = await prismadb.market.create({
      data: body,
    });

    console.log(market);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log('[REGISTER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

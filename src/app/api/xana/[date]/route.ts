import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');

  return NextResponse.json({ data: 'Favor revisar la perición' });
}

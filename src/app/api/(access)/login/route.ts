import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { prismadb } from '@/libs/prismadb';
import { regExp } from '@/libs/regExp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!regExp.email.test(email.toLowerCase())) {
      return NextResponse.json({
        status: 401,
        success: false,
        msg: 'Error --> Email invalido',
      });
    }

    if (!regExp.password.test(password)) {
      return NextResponse.json({
        status: 401,
        success: false,
        msg: 'Error --> Clave invalida',
      });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({
        status: 400,
        success: false,
        msg: 'Error --> User not Found',
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        success: false,
        msg: 'Error --> wrong credentials',
      });
    }

    const currentUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      user_role: user.user_role,
    };

    return NextResponse.json({ status: 200, currentUser });
  } catch (error) {
    console.log('[LOGIN_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { prismadb } from '@/libs/prismadb';
import { regExp } from '@/libs/regExp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

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

    if (user) {
      return NextResponse.json({
        status: 400,
        success: false,
        msg: 'Error --> usuario ya registrado',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prismadb.user.create({
      data: { ...body, password: bcryptPassword },
    });

    const currentUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAd: newUser.createdAt,
      uodateAt: newUser.updatedAt,
      user_role: newUser.user_role,
    };

    return NextResponse.json({ status: 200, currentUser });
  } catch (error) {
    console.log('[REGISTER_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

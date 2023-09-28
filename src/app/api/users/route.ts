import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import { prismadb } from '@/libs/prismadb';
import { regExp } from '@/libs/regExp';

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!regExp.password.test(password)) {
      return NextResponse.json({
        status: 401,
        success: false,
        msg: 'Error --> Clave invalida',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const updatedUser = await prismadb.user.update({
      where: { id },
      data: { password: bcryptPassword },
    });
    console.log('User updated:', updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
  }

  return NextResponse.json({ status: 200 });
}

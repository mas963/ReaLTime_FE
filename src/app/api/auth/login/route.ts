import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { encode } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      throw new Error('Email ve şifre boş olamaz');
    }

    await connectToDatabase();

    const user = await User.findByEmail(email);

    if (!user) {
      throw new Error('Kullanıcı bulunamadı');
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new Error('Şifre yanlış');
    }

    const token = await encode({
      token: {
        // @ts-ignore
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // 1 week
      },
      secret: process.env.NEXTAUTH_SECRET || '',
    });

    return NextResponse.json({
      user: {
        // @ts-ignore
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token
    }, {
      status: 200,
    });

  } catch (error) {
    console.log('Giriş hatası:', error);
    return NextResponse.json({ error: 'Giriş yapılırken bir hata oluştu' }, { status: 500 });
  }
}
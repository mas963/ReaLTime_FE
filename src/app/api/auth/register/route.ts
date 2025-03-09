import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/models/User';
import { UserRole } from '@/types/UserRole';
import { z } from 'zod';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır' }).max(50, { message: 'İsim en fazla 50 karakter olmalıdır' }),
  email: z.string().email({ message: 'Geçerli bir e-posta adresi girin' }),
  password: z.string().min(8, { message: 'Şifre en az 8 karakter olmalıdır' }).max(50, { message: 'Şifre en fazla 50 karakter olmalıdır' }),
});

type RegisterInput = z.infer<typeof registerSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(validationResult.error.errors, { status: 400 });
    }

    const { name, email, password } = validationResult.data as RegisterInput;

    await connectToDatabase();

    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return NextResponse.json({ error: 'Bu e-posta adresi zaten kullanılıyor' }, { status: 400 });
    }

    const newUser = new User({
      name,
      email,
      password,
      role: UserRole.USER,
    });

    await newUser.save();

    return NextResponse.json({ success: true, message: 'Kayıt başarılı', userId: newUser._id }, { status: 201 });
  } catch (error) {
    console.error('Kayıt olma hatası:', error);
    return NextResponse.json({ error: 'Kayıt olma hatası' }, { status: 500 });
  }
}
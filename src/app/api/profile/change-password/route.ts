import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { z } from "zod";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, { message: 'Şifre en az 8 karakter olmalıdır' }).max(50, { message: 'Şifre en fazla 50 karakter olmalıdır' }),
  newPassword: z.string().min(8, { message: 'Yeni şifre en az 8 karakter olmalıdır' }).max(50, { message: 'Yeni şifre en fazla 50 karakter olmalıdır' }),
});

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Kullanıcı oturum açmamış" }, { status: 401 });
  }

  const body = await req.json();

  const validationResult = changePasswordSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(validationResult.error.errors, { status: 400 });
  }

  const { currentPassword, newPassword } = validationResult.data as ChangePasswordSchema;

  try {
    await connectToDatabase();

    const user = await User.findById(session.user?.id);

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Mevcut şifre yanlış" }, { status: 400 });
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json({ success: true, message: "Şifre değiştirildi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Şifre değiştirilirken bir hata oluştu" }, { status: 500 });
  }
}
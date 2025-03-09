import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Kullanıcı oturum açmamış" }, { status: 401 });
  }

  const { name, email } = await req.json();
  console.log(session.user);

  try {
    await connectToDatabase();

    const user = await User.findById(session.user?.id);

    if (!user) {
      return NextResponse.json({ error: "Kullanıcı bulunamadı" }, { status: 404 });
    }

    user.name = name;
    user.email = email;

    await user.save();

    return NextResponse.json({ success: true, message: "Profil güncellendi" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Profil güncellenirken bir hata oluştu" }, { status: 500 });
  }
}
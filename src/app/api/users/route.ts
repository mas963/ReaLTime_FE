import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { User } from "@/models/User";
import { withProtectedApi } from "@/lib/api-utils";
import { UserRole } from "@/types/UserRole";

async function getUsers(req: NextRequest, user: any): Promise<NextResponse> {
  try {
    await connectToDatabase();

    const users = await User.find({})
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json({ users });
  } catch (error) {
    console.log('Kullanıcı listesi hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcılar alınırken bir hata oluştur' },
      { status: 500 }
    );
  }
}

async function createUser(req: NextRequest, user: any): Promise<NextResponse> {
  try {
    const body = await req.json();
    await connectToDatabase();

    const newUser = new User(body);
    await newUser.save();

    return NextResponse.json(
      { success: true, user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    // mongodb duplikasyon hatası
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kullanımda' },
        { status: 400 }
      );
    }

    console.log('Kullanıcı oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Kullanıcı oluşturulurken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export const GET = withProtectedApi(getUsers, { requiredRoles: UserRole.ADMIN });
export const POST = withProtectedApi(createUser, { requiredRoles: UserRole.ADMIN });

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserRole } from "@/types/UserRole";

type ApiHandler = (req: NextRequest, user: any) => Promise<NextResponse>;

interface ProtectOptions {
  requiredRoles?: UserRole | UserRole[];
}

export function withProtectedApi(handler: ApiHandler, options: ProtectOptions = {}) {
  return async function (req: NextRequest): Promise<NextResponse> {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Kimlik doğrulaması gerekli' },
        { status: 401 }
      );
    }

    if (options.requiredRoles) {
      const userRole = session.user.role as UserRole;
      const requiredRoles = Array.isArray(options.requiredRoles)
        ? options.requiredRoles
        : [options.requiredRoles];

      if (!requiredRoles.includes(userRole)) {
        return NextResponse.json(
          { error: 'Bu işlem için yeterli yetkiniz yok' },
          { status: 403 }
        );
      }
    }

    // korumalı handler'ı çağırır
    return handler(req, session.user);
  };
}
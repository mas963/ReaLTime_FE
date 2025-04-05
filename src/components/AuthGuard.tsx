"use client"

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/types/UserRole";

interface AuthGuardProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[] | null;
  fallback?: ReactNode;
}

export function AuthGuard({
  children,
  requiredRole = null,
  fallback = <div className="flex justify-center items-center min-h-screen">Loading...</div>
}: AuthGuardProps) {
  const { isLoading, isAuthenticated, hasRequiredRole } = useAuth({
    requiredRole,
    redirectTo: "/auth/signin",
  });

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (!isAuthenticated || (requiredRole && !hasRequiredRole)) {
    return null;
  }

  return <>{children}</>;
}
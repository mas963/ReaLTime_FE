"use client"

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserRole } from "@/types/UserRole";

interface UseAuthOptions {
  requiredRole?: UserRole | UserRole[] | null;
  redirectTo?: string;
  redirectIfFound?: boolean;
}

export function useAuth({
  requiredRole = null,
  redirectTo = "/auth/signin",
  redirectIfFound = false
}: UseAuthOptions = {}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const loading = status === "loading";
  const user = session?.user || null;
  const isAuthenticated = !!user;

  // kullanıcının rolü gereken role uygun mu
  const hasRequiredRole = !requiredRole
    ? true
    : user?.role
      ? Array.isArray(requiredRole)
        ? requiredRole.includes(user.role)
        : requiredRole === user.role
      : false;

  useEffect(() => {
    if (loading) return;

    if (!redirectTo) return;

    // Authenticate olmadıysa veya gerekli role sahip değilse yönlendir
    if (!isAuthenticated || (requiredRole && !hasRequiredRole)) {
      const destination = `${redirectTo}${redirectTo.includes("?") ? "&" : "?"
        }callbackUrl=${encodeURIComponent(pathname || "/")}`;
      router.push(destination);
    }
  }, [loading, isAuthenticated, hasRequiredRole, redirectTo, pathname, router]);

  return {
    user,
    isAuthenticated,
    isLoading: loading,
    hasRequiredRole
  };
}
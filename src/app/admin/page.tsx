"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { UserRole } from "@/types/UserRole";

export default function AdminPage() {
  return (
    <AuthGuard requiredRole={UserRole.ADMIN}>
      <h1>Admin Sayfası</h1>
    </AuthGuard> 
  )
}
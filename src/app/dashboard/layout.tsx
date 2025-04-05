import { AuthGuard } from "@/components/AuthGuard"
import { Header } from "@/components/dashboard/header"
import { Toaster } from "sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthGuard>
        <Header />
        <Toaster />
        <main className="mx-auto w-full max-w-7xl flex-1 space-y-4 md:p-8 p-2 pt-6">
          {children}
        </main>
      </AuthGuard>
    </div>
  )
}

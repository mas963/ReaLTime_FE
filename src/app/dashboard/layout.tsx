import { Header } from "@/components/dashboard/header"
import { Toaster } from "sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Toaster />
      <main className="flex-1 space-y-4 p-8 pt-6">{children}</main>
    </div>
  )
}

import { Header } from "@/components/dashboard/header"
import { NextAuthProvider } from "@/providers/NextAuthProvider"
import { ThemeProvider } from "@/providers/theme-provider"
import { Toaster } from "sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NextAuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Header />
          <Toaster />
          <main className="mx-auto w-full max-w-7xl flex-1 space-y-4 p-8 pt-6">
            {children}
          </main>
        </ThemeProvider>
      </NextAuthProvider >
    </div>
  )
}

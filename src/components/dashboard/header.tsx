"use client"

import { MainNav } from "@/components/dashboard/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/dashboard/user-nav"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes";

export function Header() {
  const { theme } = useTheme();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center lg:px-16 px-2">
        <Link href="/dashboard">
          <Image src={theme === "dark" ? "/wolfsprintWhiteLogo.png" : "/wolfsprintLogo.png"} alt="logo" width={160} height={160} />
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

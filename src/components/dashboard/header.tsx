"use client"

import { MainNav } from "@/components/dashboard/main-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/dashboard/user-nav"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center lg:px-16 px-2">
        <Link href="/dashboard">
          <Image
            width={160}
            height={160}
            src="/ReaLTimeLogo.png"
            alt="logo"
            className="block dark:hidden"
          />
          <Image
            width={160}
            height={160}
            src="/ReaLTimeLogo-White.png"
            alt="logo"
            className="hidden dark:block"
          />
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

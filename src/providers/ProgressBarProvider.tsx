"use client"

import {usePathname} from "next/navigation"
import {useEffect, useState} from "react"
import NProgress from 'nprogress'

export const ProgressBarProvider = () => {
  const pathname = usePathname()

  useEffect(() => {
    NProgress.start()
    const timeout = setTimeout(() => {
      NProgress.done()
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [pathname]);

  return null
}
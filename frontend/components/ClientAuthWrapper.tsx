"use client"

import { useEffect } from "react"
import { axiosInstance } from "@/lib/axios" 

export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axiosInstance.get("/users/check-auth")
       
        const user = res.data.user

        if (!user || user === "null") {
          window.location.reload()
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          window.location.reload()
        } else {
          console.error("Auth check failed:", err)
          window.location.reload()
        }
      }
    }, 30_000) // every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return <>{children}</>
}

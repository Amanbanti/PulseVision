"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/state/useAuthStore"
import { ClipLoader } from 'react-spinners';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    // If the check is complete and there's no user, redirect.
    if (!isCheckingAuth && !authUser) {
      router.replace("/login")
    }
  }, [isCheckingAuth, authUser, router])
  
 
  if (isCheckingAuth) {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h4 className="text-muted-foreground mb-4">Checking authentication...</h4>
            <ClipLoader
                color={"#123abc"}
                loading={isCheckingAuth}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
  }

  // If the check is done AND there is a user, render the protected content
  if (authUser) {
    return <>{children}</>
  }


  return null;
}
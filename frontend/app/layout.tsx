import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Toaster } from "react-hot-toast"
import { Activity } from "lucide-react"

import ClientAuthWrapper from "@/components/ClientAuthWrapper"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PulseVision - Medical Imaging Platform",
  description: "AI-powered medical scan analysis for Ethiopian healthcare professionals",
  icons: {
    icon: "/activity.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Toaster position="top-right" reverseOrder={false} />
              <ClientAuthWrapper>
                 {children}
            </ClientAuthWrapper>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
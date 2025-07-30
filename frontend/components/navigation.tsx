"use client"

import Link from "next/link"
import { usePathname,useRouter} from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Upload, Users, Settings, LogOut, Moon, Sun, Activity } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/state/useAuthStore"



const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter();
  const { theme, setTheme } = useTheme()

  
const { authUser,logout } = useAuthStore()
 
const logoutHandler = async () => {
  try {
    await logout()
    router.push("/login")
  } catch (error) {
    console.error("Logout error:", error)
  }
}




  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
          {authUser === null ? ( 
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">Pulse Vision</span>
            </div>
          ) : (
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-xl">Pulse Vision</span>
            </Link>
          )}
           
         {authUser && 
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
        }
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {authUser && (
    
              <div>
                  {authUser?.role === "admin" && (
                      <Button variant="ghost" size="sm">
                           <Link href="/admin" className="flex items-center">
                            <span className="font-bold text-md">Manage User</span>
                          </Link>
                      </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={logoutHandler}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
              </div>
           

            ) }
          </div>
        </div>
      </div>
    </nav>
  )
}

import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"


type Role = "admin" | "technician" | "radiologist"

interface AuthUser {
  _id: string
  name: string
  email: string
  role: Role
}

interface AuthStore {
  authUser: AuthUser | null
  isLoggingIn: boolean
  isSigningUp: boolean
  isCheckingAuth: boolean
  isUpdatingProfile: boolean
  isUpdatePassword: boolean
  checkAuth: () => Promise<void>
  signup: (data: any) => Promise<void>
  login: (data: any) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: any) => Promise<void>
  updatePassword: (data: any) => Promise<void>

}

export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null, // { _id, name, email, role }
  isLoggingIn: false,
  isSigningUp: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  isUpdatePassword: false,





  // ✅ Check if authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/users/check-auth")
      
      if (res.data.user === "null") {
        set({ authUser: null })
        console.log(res.data.user)
      } else {
        set({ authUser: res.data.user })
      }
    } catch (err) {
      console.error("Auth check failed", err)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  
  

  // ✅ Sign up
  signup: async (data: any) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/users", data)
      set({ authUser: res.data })
      toast.success("Account created Successfully!")
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false })
    }
  },

  // ✅ Login
  login: async (data : any) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post("/users/login", data)
      set({ authUser: res.data })
      toast.success("Welcome back")
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false })
    }
  },

  // ✅ Logout
  logout: async () => {
    try {
      await axiosInstance.post("/users/logout")
      set({ authUser: null })
      toast.success("Logged out")
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
    }
  },


  // ✅ Update profile
  updateProfile: async (data: any) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put("/users/profile", data)
      set({ authUser: res.data })
      toast.success("Profile updated successfully")
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || "Profile update failed";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  // ✅ Update password
  updatePassword: async (data: any) => {
    set({ isUpdatePassword: true })
    try {
      const res = await axiosInstance.put("/users/update-password", data)
      toast.success("Password updated successfully")
    } catch (err) {
      const errorMessage = (err as any)?.response?.data?.message || "Password update failed";
      toast.error(errorMessage);
    } finally {
      set({ isUpdatePassword: false })
    }
  }
 
}))

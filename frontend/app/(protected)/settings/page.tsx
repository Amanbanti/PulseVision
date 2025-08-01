"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import toast from "react-hot-toast"

import { useAuthStore } from "@/state/useAuthStore"

export default function SettingsPage() {
  const { authUser, isUpdatingProfile, updateProfile,updatePassword,isUpdatePassword } = useAuthStore()


    const [name, setName] = useState(authUser?.name || "")
    const [email, setEmail] = useState(authUser?.email || "")
    const [newPassword, setNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showPasswordModal, setShowPasswordModal] = useState(false)



    const updateProfileHandler = () =>{
        updateProfile({ name, email })
        // Simulate profile update
        setTimeout(() => {
            console.log("Profile updated")
        }, 1500)
    }

    const updatePasswordHandler = () =>{
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match")
        return
      }
      updatePassword({currentPassword, newPassword})
    }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal information and contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Name</Label>
                <Input      
                  id="name"
                  placeholder="Enter the name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>
    
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
              id="email" 
              type="email"
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            </div>
   
            <Button onClick={() => setShowConfirmModal(true)} disabled={isUpdatingProfile}>
            {isUpdatingProfile ? "Updating..." : "Update Profile"}
          </Button>

            {showConfirmModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm">
                      <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                      <p className="text-sm text-muted-foreground mb-6">This will update your profile information.</p>
                      <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
                          No
                        </Button>
                        <Button
                          onClick={() => {
                            updateProfileHandler()
                            setShowConfirmModal(false)
                          }}
                          disabled={isUpdatingProfile}
                        >
                          {isUpdatingProfile ? "Updating..." : "Yes"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
          </CardContent>
        </Card>


        <Card>
          <CardHeader>
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input 
              id="currentPassword" 
              type="password" 
              value={currentPassword} 
              placeholder="Enter Current Password"
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input 
              id="newPassword" 
              type="password"
              value={newPassword}
              placeholder="Enter New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
               />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input 
                id="confirmPassword" 
                type="password"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
            </div>
            <Button onClick={()=> setShowPasswordModal(true)} disabled={isUpdatePassword}>
              {isUpdatePassword ? "Updating Password..." : "Update Password"}
            </Button>
            {showPasswordModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-sm">
                    <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                    <p className="text-sm text-muted-foreground mb-6">This will update your password.</p>
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
                        No
                      </Button>
                      <Button
                        onClick={() => {
                          updatePasswordHandler()
                          setShowPasswordModal(false)
                        }}
                        disabled={isUpdatingProfile}
                      >
                        {isUpdatingProfile ? "Updating..." : "Yes"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

          </CardContent>
        </Card>
      </div>
    </div>
  )
}

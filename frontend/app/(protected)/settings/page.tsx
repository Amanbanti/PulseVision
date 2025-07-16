"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
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
   
            <Button onClick={updateProfileHandler} disabled={isUpdatingProfile} >
              {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email alerts for new scan results</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive SMS alerts for urgent cases</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Desktop Notifications</Label>
                <p className="text-sm text-muted-foreground">Show browser notifications</p>
              </div>
              <Switch />
            </div>
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
            <Button onClick={updatePasswordHandler} disabled={isUpdatePassword}>
              {isUpdatePassword ? "Updating Password..." : "Update Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

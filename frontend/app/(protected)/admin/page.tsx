"use client"

import { useState,useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Plus, Edit, Trash2, UserX } from "lucide-react"
import type { User } from "@/types/admin"
import AdminLayout from "@/components/AdminLayout";
import { axiosInstance } from "@/lib/axios"
import { toast } from "react-hot-toast"
import { formatDate } from "@/lib/utils"
import {UserTableSkeleton} from "@/components/CardSkeleton"



export default function  UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteUser, setDeleteUser] = useState<User | null>(null);



  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<{
    success: boolean,
    count:number
    currentPage: number;
    limit: number;
    totalPages: number;
    totalUsers: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null>(null);
    const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
    
          const { data } = await axiosInstance.get("/users", {
            params: {
              search: searchTerm || undefined,
              page,
              limit,
            },
          });
    
          setMeta(data);
          setUsers(data.users);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to fetch user records. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [page, limit, searchTerm]);
  
  
  const handleEditUser = (user: User) => {
    setEditingUser(user)
  }
  const DeletedUser = (user: User) => {
    setDeleteUser(user)
  }

  const handleCloseDeletedDialog = () => {
    setDeleteUser(null)
  }

  const handleUpdateUser = () => {
    if (!editingUser) return;
    setUpdateLoading(true);

    axiosInstance.put(`/users/${editingUser._id}`, {
      role: editingUser.role,
    })
    .then(() => {
      toast.success("User updated successfully");
      setEditingUser(null);
      setUpdateLoading(false);
      // Optionally, refetch users or update state to reflect changes
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === editingUser?._id ? { ...u, role: editingUser.role } : u
        )
      );
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
      setUpdateLoading(false);
    });
   
  }

  const handleDeleteUser = (id: string) => {
    if (!deleteUser) return;
    if(deleteUser.role == "admin") {
      toast.error("Cannot delete an admin user");
      return;
    }
    setDeleteLoading(true);
    axiosInstance.delete(`/users/${id}`)
      .then(() => {
        toast.success("User deleted successfully");
        setDeleteLoading(false);
        setDeleteUser(null);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user. Please try again.");
        setDeleteLoading(false);
        setDeleteUser(null);
      });
   
  }

  return (

    <AdminLayout>
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h2>
          <p className="text-gray-600 dark:text-gray-400">Manage user accounts and permissions</p>
        </div>
      </div>

       <div className="flex gap-2 sm:w-auto">
        <div className="relative flex-1 sm:w-48">
          <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-sm"
          />
        </div>
      </div>


      {loading ? (<UserTableSkeleton/>
      ) : (

        <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>User Management</CardTitle>
           
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => DeletedUser(user)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      )
    
    }

      

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value: any) => setEditingUser({ ...editingUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="radiologist">Radiologist</SelectItem>
                    <SelectItem value="technician">Technician</SelectItem>
                  
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateUser}  className="w-full" disabled={updateLoading}>
                {updateLoading ? "Updating..." : "Update User"}
              
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>


       {/* Delete User Dialog */}
      <Dialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          {deleteUser && (
            <div className="space-y-4">
             <p>Are you sure you want to delete this user? This action cannot be undone.</p>
             <div className="flex justify-end space-x-2 mt-4">
               <Button variant="outline" onClick={handleCloseDeletedDialog}>
                 Cancel
               </Button>
               <Button variant="destructive" onClick={() => handleDeleteUser(deleteUser._id)} disabled={deleteLoading}>
                 <Trash2 className="h-4 w-4" />
                 {deleteLoading ? "Deleting..." : "Delete User"}
                
               </Button>
             </div>
            </div>

          )}
         
        </DialogContent>
      </Dialog>

         <div className="flex justify-between items-center mt-4">
                <div>
                  <p>
                    Page {meta?.currentPage ?? 1} of {meta?.totalPages ?? 1}
                  </p>
                </div>
      
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    disabled={!meta?.hasPrevPage}
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  >
                    Previous
                  </Button>
      
                  <Button
                    variant="outline"
                    disabled={!meta?.hasNextPage}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
    </div>
    </AdminLayout>
  )
}

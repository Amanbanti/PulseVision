export interface User {
  _id: string
  name: string
  email: string
  role: "admin" | "radiologist" | "technician"
  createdAt: string
  lastActive: string
}
import type { User} from "@/types/admin"


export const users: User[] = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "radiologist",
    createdAt: "2024-01-15",
    lastActive: "2024-01-18",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    createdAt: "2024-01-10",
    lastActive: "2024-01-18",
  },
  {
    _id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "radiologist",
    createdAt: "2024-01-05",
    lastActive: "2024-01-16",
  },
  {
    _id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "radiologist",
    createdAt: "2024-01-12",
    lastActive: "2024-01-18",
  },
  {
    _id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "radiologist",
    createdAt: "2024-01-08",
    lastActive: "2024-01-17",
  },
]


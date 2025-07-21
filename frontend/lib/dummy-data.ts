import type { User, SystemStats, ActivityData, LogEntry, AnalyticsData } from "@/types/admin"

export const systemStats: SystemStats = {
  totalUsers: 12543,
  activeDevices: 8921,
  alertsToday: 47,
  serverUptime: "99.9%",
}

export const activityData: ActivityData[] = [
  { time: "00:00", users: 1200, devices: 800, alerts: 5 },
  { time: "04:00", users: 800, devices: 600, alerts: 2 },
  { time: "08:00", users: 2400, devices: 1800, alerts: 12 },
  { time: "12:00", users: 3200, devices: 2400, alerts: 18 },
  { time: "16:00", users: 2800, devices: 2100, alerts: 15 },
  { time: "20:00", users: 2000, devices: 1500, alerts: 8 },
]

export const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "user",
    dateJoined: "2024-01-15",
    lastActive: "2024-01-18",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "admin",
    dateJoined: "2024-01-10",
    lastActive: "2024-01-18",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "user",
    dateJoined: "2024-01-05",
    lastActive: "2024-01-16",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    status: "active",
    role: "moderator",
    dateJoined: "2024-01-12",
    lastActive: "2024-01-18",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "active",
    role: "user",
    dateJoined: "2024-01-08",
    lastActive: "2024-01-17",
  },
]

export const logs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-18 10:30:15",
    level: "info",
    message: "User login successful",
    source: "auth-service",
  },
  {
    id: "2",
    timestamp: "2024-01-18 10:25:42",
    level: "warning",
    message: "High memory usage detected",
    source: "system-monitor",
  },
  {
    id: "3",
    timestamp: "2024-01-18 10:20:33",
    level: "error",
    message: "Database connection failed",
    source: "database",
  },
  {
    id: "4",
    timestamp: "2024-01-18 10:15:21",
    level: "info",
    message: "Backup completed successfully",
    source: "backup-service",
  },
  {
    id: "5",
    timestamp: "2024-01-18 10:10:18",
    level: "warning",
    message: "API rate limit approaching",
    source: "api-gateway",
  },
]

export const analyticsData: AnalyticsData[] = [
  { date: "2024-01-12", users: 1200, sessions: 1800, alerts: 45 },
  { date: "2024-01-13", users: 1350, sessions: 2100, alerts: 52 },
  { date: "2024-01-14", users: 1180, sessions: 1950, alerts: 38 },
  { date: "2024-01-15", users: 1420, sessions: 2300, alerts: 61 },
  { date: "2024-01-16", users: 1380, sessions: 2150, alerts: 47 },
  { date: "2024-01-17", users: 1500, sessions: 2400, alerts: 55 },
  { date: "2024-01-18", users: 1450, sessions: 2250, alerts: 49 },
]

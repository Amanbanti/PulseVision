export interface User {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
  role: "user" | "admin" | "moderator"
  dateJoined: string
  lastActive: string
}

export interface SystemStats {
  totalUsers: number
  activeDevices: number
  alertsToday: number
  serverUptime: string
}

export interface ActivityData {
  time: string
  users: number
  devices: number
  alerts: number
}

export interface LogEntry {
  id: string
  timestamp: string
  level: "info" | "warning" | "error"
  message: string
  source: string
}

export interface AnalyticsData {
  date: string
  users: number
  sessions: number
  alerts: number
}

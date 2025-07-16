"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, Upload, Users, TrendingUp, Calendar } from "lucide-react"
import { mockUser, mockScans } from "@/lib/mock-data"
import { formatDate } from "@/lib/utils"
import { useAuthStore } from "@/state/useAuthStore"

export default function DashboardPage() {
  const totalScans = mockScans.length
  const abnormalCases = mockScans.filter((scan) => scan.abnormal).length
  const lastUpload = mockScans[0]?.uploadDate

  const {authUser} = useAuthStore()

  return (
        <div className="container mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {authUser?.name}</h1>
          <p className="text-muted-foreground">Here's what's happening with your medical scans today.</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button asChild>
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Scan
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/patients">
              <Users className="mr-2 h-4 w-4" />
              View Patients
            </Link>
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abnormal Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{abnormalCases}</div>
            <p className="text-xs text-muted-foreground">
              {((abnormalCases / totalScans) * 100).toFixed(1)}% of total scans
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Upload</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDate(lastUpload)}</div>
            <p className="text-xs text-muted-foreground">Most recent scan upload</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
            <p className="text-xs text-muted-foreground">AI diagnostic accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Latest medical scans processed by the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockScans.slice(0, 3).map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{scan.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      {scan.scanType.toUpperCase()} • {formatDate(scan.uploadDate)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={scan.abnormal ? "destructive" : "secondary"}>{scan.diagnosis}</Badge>
                  <span className="text-sm text-muted-foreground">{scan.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/patients">View All Scans</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    
  )
}

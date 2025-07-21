"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, RefreshCw } from "lucide-react"
import { logs } from "@/lib/dummy-data"

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState<"all" | "info" | "warning" | "error">("all")
  const [dateFilter, setDateFilter] = useState("")

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesDate = !dateFilter || log.timestamp.includes(dateFilter)
    return matchesSearch && matchesLevel && matchesDate
  })

  const handleExportLogs = () => {
    alert("Exporting logs...")
  }

  const handleRefreshLogs = () => {
    alert("Refreshing logs...")
  }

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      default:
        return "default"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">System Logs</h2>
          <p className="text-gray-600 dark:text-gray-400">Monitor system events and troubleshoot issues</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshLogs}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <CardTitle>Log Entries</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto flex-wrap">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>

              <Select value={levelFilter} onValueChange={(value: any) => setLevelFilter(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-40" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-4"></TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className={`w-2 h-2 rounded-full ${getLevelColor(log.level)}`} />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={getLevelBadgeVariant(log.level)}>{log.level.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{log.source}</TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No logs found matching your criteria.</div>
          )}
        </CardContent>
      </Card>

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Logs Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <p className="text-xs text-muted-foreground">-0.5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Most Active Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">auth-service</div>
            <p className="text-xs text-muted-foreground">342 entries today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

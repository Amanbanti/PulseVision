"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Filter, Eye, Download } from "lucide-react"
import { mockScans } from "@/lib/mock-data"
import { formatDate, getConfidenceColor } from "@/lib/utils"
import Image from "next/image"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [scanTypeFilter, setScanTypeFilter] = useState("all")
  const [diagnosisFilter, setDiagnosisFilter] = useState("all")
  const [selectedScan, setSelectedScan] = useState<any>(null)

  const filteredScans = mockScans.filter((scan) => {
    const matchesSearch = scan.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesScanType = scanTypeFilter === "all" || scan.scanType === scanTypeFilter
    const matchesDiagnosis = diagnosisFilter === "all" || scan.diagnosis === diagnosisFilter

    return matchesSearch && matchesScanType && matchesDiagnosis
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Patient Records</h1>
        <p className="text-muted-foreground">View and manage all medical scan records</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={scanTypeFilter} onValueChange={setScanTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Scan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="x-ray">X-Ray</SelectItem>
                <SelectItem value="ct">CT Scan</SelectItem>
                <SelectItem value="ultrasound">Ultrasound</SelectItem>
              </SelectContent>
            </Select>

            <Select value={diagnosisFilter} onValueChange={setDiagnosisFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Diagnosis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diagnoses</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Pneumonia">Pneumonia</SelectItem>
                <SelectItem value="Gallstones">Gallstones</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setScanTypeFilter("all")
                setDiagnosisFilter("all")
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Scan Records</CardTitle>
          <CardDescription>{filteredScans.length} records found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Patient</th>
                  <th className="text-left p-4 font-medium">Scan Type</th>
                  <th className="text-left p-4 font-medium">Date</th>
                  <th className="text-left p-4 font-medium">Diagnosis</th>
                  <th className="text-left p-4 font-medium">Confidence</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredScans.map((scan) => (
                  <tr key={scan.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{scan.patientName}</p>
                        <p className="text-sm text-muted-foreground">ID: {scan.patientId}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{scan.scanType.toUpperCase()}</Badge>
                    </td>
                    <td className="p-4 text-sm">{formatDate(scan.uploadDate)}</td>
                    <td className="p-4">
                      <Badge variant={scan.abnormal ? "destructive" : "secondary"}>{scan.diagnosis}</Badge>
                    </td>
                    <td className="p-4">
                      <span className={getConfidenceColor(scan.confidence || 0)}>{scan.confidence}%</span>
                    </td>
                    <td className="p-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedScan(scan)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Report
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Scan Report - {scan.patientName}</DialogTitle>
                            <DialogDescription>Detailed analysis and diagnostic information</DialogDescription>
                          </DialogHeader>

                          {selectedScan && (
                            <div className="grid gap-6 md:grid-cols-2">
                              <div className="space-y-4">
                                <div>
                                  <h3 className="font-semibold mb-2">Patient Information</h3>
                                  <div className="space-y-1 text-sm">
                                    <p>
                                      <span className="font-medium">Name:</span> {selectedScan.patientName}
                                    </p>
                                    <p>
                                      <span className="font-medium">Patient ID:</span> {selectedScan.patientId}
                                    </p>
                                    <p>
                                      <span className="font-medium">Scan Type:</span>{" "}
                                      {selectedScan.scanType.toUpperCase()}
                                    </p>
                                    <p>
                                      <span className="font-medium">Date:</span> {formatDate(selectedScan.uploadDate)}
                                    </p>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold mb-2">Diagnosis</h3>
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <Badge variant={selectedScan.abnormal ? "destructive" : "secondary"}>
                                        {selectedScan.diagnosis}
                                      </Badge>
                                      <span className={`text-sm ${getConfidenceColor(selectedScan.confidence)}`}>
                                        {selectedScan.confidence}% confidence
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h3 className="font-semibold mb-2">Recommendations</h3>
                                  <ul className="text-sm space-y-1">
                                    <li>• Follow-up examination recommended</li>
                                    <li>• Monitor patient symptoms</li>
                                    <li>• Consider additional imaging if symptoms persist</li>
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold mb-2">Medical Image</h3>
                                <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                  <Image
                                    src={selectedScan.imageUrl || "/placeholder.svg"}
                                    alt="Medical scan"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end space-x-2 mt-6">
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Download Report (PDF)
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredScans.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No records found matching your criteria</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
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
import { formatDate, getConfidenceColor } from "@/lib/utils"
import Image from "next/image"
import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import ScanReportSkeleton from '@/components/CardSkeleton'


export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [scanTypeFilter, setScanTypeFilter] = useState("all")
  const [diagnosisFilter, setDiagnosisFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any[]>([])
  const [selectedScan, setSelectedScan] = useState<any>(null)
  const [meta, setMeta] = useState<{
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  } | null>(null);
  
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("-createdAt");



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const { data } = await axiosInstance.get("/patients", {
          params: {
            page,
            limit,
            search: searchTerm || undefined,
            scanType: scanTypeFilter === "all" ? undefined : scanTypeFilter,
            diagnosis: diagnosisFilter === "all" ? undefined : diagnosisFilter,
            sort, // e.g. "-createdAt"
          },
        });
  
        // backend returns { data: [...], meta: {...} }
        setData(data.data);
        setMeta(data.meta);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch patient records. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page, limit, searchTerm, scanTypeFilter, diagnosisFilter, sort]);




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
                <SelectItem value="xray">X-Ray</SelectItem>
                <SelectItem value="ctscan">CT Scan</SelectItem>
              </SelectContent>
            </Select>

            <Select value={diagnosisFilter} onValueChange={setDiagnosisFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Diagnosis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Diagnoses</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Abnormal">Abnormal</SelectItem>
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
          <CardDescription>{meta?.totalItems} records found</CardDescription>
        </CardHeader>


        {loading ? <ScanReportSkeleton /> : (

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
                    {data.map((scan) => (
                      <tr key={scan._id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{scan.fullName}</p>
                            <p className="text-sm text-muted-foreground">ID: {scan._id}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline">{scan.scanType.toUpperCase()}</Badge>
                        </td>
                        <td className="p-4 text-sm">{formatDate(scan.createdAt)}</td>
                        <td className="p-4">
                          <Badge variant={scan.isAbnormal ? "destructive" : "secondary"}>{scan.isAbnormal ? "Abnormal" : "Normal"}</Badge>
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
                                <DialogTitle>Scan Report - {scan.fullName}</DialogTitle>
                                <DialogDescription>Detailed analysis and diagnostic information</DialogDescription>
                              </DialogHeader>

                              {selectedScan && (
                                
                                <div className="grid gap-6 md:grid-cols-2">
                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="font-semibold mb-2">Patient Information</h3>
                                      <div className="space-y-1 text-sm">
                                        <p>
                                          <span className="font-medium">Name:</span> {selectedScan.fullName}
                                        </p>
                                        <p>
                                          <span className="font-medium">Patient ID:</span> {selectedScan._id}
                                        </p>
                                        <p>
                                          <span className="font-medium">Scan Type:</span>{" "}
                                          {selectedScan.scanType.toUpperCase()}
                                        </p>
                                        <p>
                                          <span className="font-medium">Date:</span> {formatDate(selectedScan.createdAt)}
                                        </p>
                                      </div>
                                    </div>

                                    <div>
                                      <h3 className="font-semibold mb-2">Diagnosis</h3>
                                      <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                          <Badge variant={selectedScan.isAbnormal ? "destructive" : "secondary"}>
                                            {selectedScan.isAbnormal ? "Abnormal" : "Normal"}
                                          </Badge>
                                          <span className={`text-sm ${getConfidenceColor(selectedScan.confidence)}`}>
                                            {selectedScan.confidence}% confidence
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                              
                                  </div>

                                  <div>
                                    <h3 className="font-semibold mb-2">Medical Image</h3>
                                    <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                                      <Image
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${selectedScan.scanImage.replace(/\\/g, "/")}`}
                                        alt="Medical scan"
                                        fill
                                        className="object-cover"
                                      />
                                      
                                    </div>
                                  </div>
                                </div>
                              )}

                      
                            </DialogContent>
                          </Dialog>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No records found matching your criteria</div>
              )}
              </CardContent>


        )}
        
      </Card>


      <div className="flex justify-between items-center mt-4">
          <div>
            <p>
              Page {meta?.page ?? 1} of {meta?.totalPages ?? 1}
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
  )
}

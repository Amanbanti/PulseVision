export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "radiologist" | "technician"
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: "male" | "female"
}

export interface Scan {
  id: string
  patientId: string
  patientName: string
  scanType: "x-ray" | "ct" | "ultrasound"
  uploadDate: string
  imageUrl: string
  diagnosis?: string
  confidence?: number
  status: "uploaded" | "analyzing" | "completed"
  abnormal: boolean
}

export interface AIResult {
  diagnosis: string
  confidence: number
  heatmapUrl: string
  recommendations: string[]
}

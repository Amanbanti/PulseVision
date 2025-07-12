import type { Scan, User } from "./types"

export const mockUser: User = {
  id: "1",
  name: "Dr. Abebe Tadesse",
  email: "abebe.tadesse@hospital.et",
  role: "radiologist",
}

export const mockScans: Scan[] = [
  {
    id: "1",
    patientId: "1",
    patientName: "Almaz Bekele",
    scanType: "x-ray",
    uploadDate: "2024-01-15",
    imageUrl: "/placeholder.svg?height=400&width=400",
    diagnosis: "Pneumonia",
    confidence: 93.4,
    status: "completed",
    abnormal: true,
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Dawit Haile",
    scanType: "ct",
    uploadDate: "2024-01-14",
    imageUrl: "/placeholder.svg?height=400&width=400",
    diagnosis: "Normal",
    confidence: 97.2,
    status: "completed",
    abnormal: false,
  },
  {
    id: "3",
    patientId: "3",
    patientName: "Hanan Mohammed",
    scanType: "ultrasound",
    uploadDate: "2024-01-13",
    imageUrl: "/placeholder.svg?height=400&width=400",
    diagnosis: "Gallstones",
    confidence: 89.1,
    status: "completed",
    abnormal: true,
  },
]

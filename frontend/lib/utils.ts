import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getConfidenceColor(confidence: number) {
  if (confidence >= 90) return "text-green-600"
  if (confidence >= 70) return "text-yellow-600"
  return "text-red-600"
}

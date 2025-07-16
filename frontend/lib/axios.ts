import axios from "axios"

const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5001"
  : "/"

export const axiosInstance = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: true, 
})

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://carrot-back.vercel.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

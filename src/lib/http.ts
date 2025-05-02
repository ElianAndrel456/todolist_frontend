import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  validateStatus: (status) => {
    return status >= 200 && status < 300; // default
  },
});

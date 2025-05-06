import axios from "axios";

let apiURL = import.meta.env.VITE_API_URL;

if (apiURL[apiURL.length - 1] !== "/") {
  apiURL += "/";
}

export const http = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  validateStatus: (status) => {
    return status >= 200 && status < 300; // default
  },
});

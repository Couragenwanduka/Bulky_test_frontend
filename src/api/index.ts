// api/axiosInstance.ts
import axios from "axios";
import { store } from "../redux/store";

const api = (import.meta as any).env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: api,
});

// Add token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

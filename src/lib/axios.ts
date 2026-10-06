import { useLoginStore } from "@/stores/useLogin";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useLoginStore.getState().user?.accessToken;
    console.log("Isi seluruh state auth saat ini:", token);
    console.log("Token yang diambil interseptor:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Peringatan: Request dikirim TANPA token!");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

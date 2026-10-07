import { useLoginStore } from "@/stores/useLogin";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers.Authorization) {
      console.log(
        "Menggunakan token manual dari komponen:",
        config.headers.Authorization,
      );
      return config;
    }
    const token = useLoginStore.getState().user?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Peringatan: Request dikirim TANPA token!");
    }
    return config;
  },
  (error) => Promise.reject(error),
);

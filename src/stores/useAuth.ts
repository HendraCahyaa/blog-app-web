import { create } from "zustand";

// Definisikan tipe data untuk User
interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

// Definisikan struktur State dan Actions di store
interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  // Mengambil data user dari localStorage saat aplikasi pertama kali dimuat
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,

  // Fungsi untuk menyimpan data user saat login berhasil
  login: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  // Fungsi untuk menghapus data user saat logout
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

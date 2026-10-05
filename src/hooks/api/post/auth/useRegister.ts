import { axiosInstance } from "@/lib/axios";
import type { RegisterSchema } from "@/schemas/register";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";

function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: RegisterSchema) => {
      await axiosInstance.post("/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
    },
    onSuccess: () => {
      alert("Register success!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(error.response?.data.message || "Register failed!");
    },
  });
}
export default useRegister;

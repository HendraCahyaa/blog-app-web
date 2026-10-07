import { axiosInstance } from "@/lib/axios";
import type { ForgotPasswordSchema } from "@/schemas/forgotPassword";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function useForgotPassword() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: ForgotPasswordSchema) => {
      await axiosInstance.post("/auth/forgot-password", {
        email: values.email,
      });
    },
    onSuccess: () => {
      toast.success("send email success!");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "send email failed!");
    },
  });
}
export default useForgotPassword;

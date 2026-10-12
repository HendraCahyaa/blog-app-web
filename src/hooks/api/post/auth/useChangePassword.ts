import { axiosInstance } from "@/lib/axios";
import type { ChangePasswordSchema } from "@/schemas/changePassword";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
export const useChangePasswordMutation = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (values: ChangePasswordSchema) => {
      await axiosInstance.post("/auth/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
    },
    onSuccess: () => {
      toast.success("change password success!");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "change password failed!");
    },
  });
};

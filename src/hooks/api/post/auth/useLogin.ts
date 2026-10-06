import { axiosInstance } from "@/lib/axios";
import { type LoginSchema } from "@/schemas/login";
import { useLoginStore } from "@/stores/useLogin";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function useLogin() {
  const { login } = useLoginStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
      const { data } = await axiosInstance.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success("Login Success!");
      login({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        profilePic: data.user.profilePic,
        accessToken: data.accessToken,
      });
      navigate("/home");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Login Failed!");
    },
  });
}
export default useLogin;

import { axiosInstance } from "@/lib/axios";
import { useLoginStore } from "@/stores/useLogin";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function ButtonLoginGoogle() {
  const navigate = useNavigate();
  const { login } = useLoginStore();
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const response = await axiosInstance.post("/auth/google", {
          accessToken: access_token,
        });
        login({
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role,
          profilePic: response.data.user.profilePic,
          accessToken: response.data.user.accessToken,
        });
        navigate("/home");
      } catch (error) {
        toast.error("Login with google failed");
      }
    },
  });
  return (
    <Button type="button" variant="outline" onClick={() => handleLoginGoogle()}>
      Login by Google
    </Button>
  );
}
export default ButtonLoginGoogle;

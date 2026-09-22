import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { loginSchema, type LoginSchema } from "@/schemas/login";
import { useLoginStore } from "@/stores/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function LoginPage() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { login } = useLoginStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // const navigate = useNavigate();

  const handleLogin = async (values: LoginSchema) => {
    setLoading(true);
    try {
      const url = "/users/login";
      const { data } = await axiosInstance.post(url, {
        login: values.email,
        password: values.password,
      });
      alert("Login Succes!");
      login({
        name: data.name,
        email: data.email,
        objectId: data.objectId,
        token: data["user-token"],
      });
      navigate("/home");
    } catch (error) {
      console.log("error");
      alert("Login Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="w-100 mx-auto border-2 border-black mt-10 p-8 space-y-4">
        <p>Login Page</p>
        <Label>Email</Label>
        <Input type="email" {...register("email")} />
        {formState.errors.email && (
          <p className="text-red-500 text-sm">
            {formState.errors.email.message}
          </p>
        )}
        <Label>Password</Label>
        <Input type="password" {...register("password")} />
        {formState.errors.password && (
          <p className="text-red-500 text-sm">
            {formState.errors.password.message}
          </p>
        )}
        <br />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default LoginPage;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { registerSchema, type RegisterSchema } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function RegisterPage() {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const handleregister = async (values: RegisterSchema) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      alert("Register Succes!");

      navigate("/login");
    } catch (error) {
      console.log("error");
      alert("Register Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(handleregister)}>
      <div className="w-100 mx-auto border-2 border-black mt-10 p-8 space-y-4">
        <p>Register Page</p>
        <Label>Name</Label>
        <Input type="text" {...register("name")} />
        {formState.errors.name && (
          <p className="text-red-500 text-sm">
            {formState.errors.name.message}
          </p>
        )}
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
export default RegisterPage;

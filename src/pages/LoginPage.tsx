import ButtonLoginGoogle from "@/components/ButtonLoginGoogle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/api/post/auth/useLogin";
import { loginSchema, type LoginSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const handleLogin = (values: LoginSchema) => {
    mutate(values);
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading" : "Submit"}
        </Button>

        <ButtonLoginGoogle />
      </div>
    </form>
  );
}
export default LoginPage;

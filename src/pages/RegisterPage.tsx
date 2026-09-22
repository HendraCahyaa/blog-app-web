import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";

function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = "/users/register";
      await axiosInstance.post(url, { name, email, password });
      alert("Register Succes!");
    } catch (error) {
      console.log("error");
      alert("Register Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-100 mx-auto border-2 border-black mt-10 p-8 space-y-4">
      <p>Register Page</p>
      <Label>Name</Label>
      <Input type="text" onChange={(e) => setName(e.target.value)} />
      <Label>Email</Label>
      <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      <Label>Password</Label>
      <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}
      </Button>
    </div>
  );
}
export default RegisterPage;

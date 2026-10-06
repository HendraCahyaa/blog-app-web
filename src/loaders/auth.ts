import { useLoginStore } from "@/stores/useLogin";
import { redirect } from "react-router";

export const authLoader = () => {
  const { user } = useLoginStore.getState();
  if (!user) {
    return redirect("/login");
  }
  return null;
};

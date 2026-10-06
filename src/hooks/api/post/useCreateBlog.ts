import { axiosInstance } from "@/lib/axios";
import type { CreateBlogSchema } from "@/schemas/createBlog";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

function useCreateBlog() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CreateBlogSchema) => {
      const formData = new FormData();
      // formData.append("file", data.thumbnail);

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("content", data.content);
      formData.append("thumbnail", data.thumbnail);

      await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      alert("Create blog success");
      navigate("/home");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error(error);
      alert(
        error.response?.data.message || "Terjadi kesalahan saat membuat blog.",
      );
    },
  });
}
export default useCreateBlog;

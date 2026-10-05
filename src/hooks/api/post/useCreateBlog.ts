import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axiosGlobal from "axios";
import { axiosInstance } from "@/lib/axios";
import type { CreateBlogSchema } from "@/schemas/createBlog";
import { useLoginStore } from "@/stores/useLogin";

interface ResponseFileService {
  fileURL: string;
  filePath: string;
}

export const useCreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useLoginStore();
  return useMutation<void, Error, CreateBlogSchema>({
    mutationFn: async (data: CreateBlogSchema) => {
      const formData = new FormData();
      formData.append("file", data.thumbnail);

      const fileName = Date.now() + Math.floor(Math.random() * 1000);
      const folderName = "images";

      const APP_ID = "2048BDB6-7CD5-4ED2-8D73-EDF589E44954";
      const REST_API_KEY = "86FF231C-3085-4D7F-83EA-4E91D02127B6";

      // 2. KODE URL YANG SUDAH DIPERBAIKI SESUAI REST API BACKENDLESS
      const response = await axiosGlobal.post<ResponseFileService>(
        `https://api.backendless.com/${APP_ID}/${REST_API_KEY}/files/${folderName}/${fileName}`,
        formData,
      );
      // 2. Debugging: Pastikan URL dari backendless aman
      console.log("Backendless Upload Success:", response.data.fileURL);

      await axiosInstance.post(
        "/posts",
        {
          title: data.title,
          description: data.description,
          category: data.category,
          userId: 1,
          content: data.content,
          thumbnail: response.data.fileURL,
        },
        {
          headers: {
            // Sesuaikan dengan key token Anda, misalnya user.accessToken
            Authorization: `Bearer ${user?.accessToken}`,
          },
        },
      );
    },
    onSuccess: () => {
      alert("Create blog success");
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      alert("Terjadi kesalahan saat membuat blog.");
    },
  });
};

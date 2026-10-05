import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

function useGetPostBySlug(slug?: string) {
  return useQuery({
    queryKey: ["posts", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Post>(`/posts/${slug}`);
      return data;
    },
  });
}
export default useGetPostBySlug;

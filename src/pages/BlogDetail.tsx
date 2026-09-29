import { axiosInstance } from "@/lib/axios";
import type { Post } from "@/types/post";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState<Post | null>(null);
  const [isloading, setLoading] = useState<boolean>(false);

  const getBlog = async () => {
    try {
      const { data } = await axiosInstance.get<Post>(`/posts/${params.slug}`);
      setBlog(data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  if (isloading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <p>Blog not found</p>

        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <img
        src={blog.thumbnail || ""}
        alt=""
        className="h-57.5 w-full object-cover"
      />
      <h1 className="text-3xl font-bold">Blog detail - {blog.title}</h1>
      <p>
        {blog.category} - {blog.user.name}
      </p>

      <p>{blog.content}</p>
    </div>
  );
}
export default BlogDetail;

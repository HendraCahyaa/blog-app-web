import { axiosInstance } from "@/lib/axios";
import { type Blog } from "@/types/blogs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

function BlogDetail() {
  const params = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isloading, setLoading] = useState<boolean>(false);

  const getBlog = async () => {
    try {
      const { data } = await axiosInstance.get<Blog>(
        `data/blogs/${params.objectId}`,
      );
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
        {blog.category} - {blog.author}
      </p>

      <p>{blog.content}</p>
    </div>
  );
}
export default BlogDetail;

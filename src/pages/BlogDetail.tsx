import useGetPostBySlug from "@/hooks/api/post/useGetPostBySlug";
import { Link, useParams } from "react-router";

function BlogDetail() {
  const params = useParams();

  const { data: blog, isPending } = useGetPostBySlug(params.slug);

  if (isPending) {
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

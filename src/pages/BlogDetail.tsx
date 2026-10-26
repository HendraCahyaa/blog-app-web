// src/pages/BlogDetail.tsx

import Markdown from "@/components/MarkDown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useGetPostBySlug from "@/hooks/api/post/useGetPostBySlug";
import { formatDate } from "@/utils/FormatDate";

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
        <p>Blog Not Found</p>

        <Link to="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-4 my-16 px-6">
      <Badge className="text-sm">{blog.category}</Badge>

      <h1 className="text-3xl md:text-4xl font-bold">{blog.title}</h1>

      <p className="font-light">
        {blog.user.name} - {formatDate(blog.createAt)}
      </p>

      <img
        src={blog.thumbnail || ""}
        alt="thumbnail blog"
        className="h-48 md:h-100 w-full object-cover rounded-sm"
      />

      <p className="text-lg md:text-xl">{blog.description}</p>

      <Separator />

      <Markdown content={blog.content} />
    </div>
  );
}

export default BlogDetail;

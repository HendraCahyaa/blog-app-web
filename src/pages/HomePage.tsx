import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/axios";
import { useLoginStore } from "@/stores/useLogin";
import type { Blog } from "@/types/blogs";
import type { PaginationResponse } from "@/types/pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router";

function HomePage() {
  const [blogs, setBlogs] = useState<PaginationResponse<Blog> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<Number>(1);

  const { user, logout } = useLoginStore();

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance.get<PaginationResponse<Blog>>(
        "/posts",
        { params: { page: page } },
      );
      setBlogs(data);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrev = () => {
    const currentPage = blogs?.meta.page || 1;
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    const currentPage = blogs?.meta.page || 1;
    const total = blogs?.meta.total || 0;
    const take = blogs?.meta.take || 0;
    const totalPage = Math.ceil(total / take);

    if (currentPage < totalPage) {
      setPage(currentPage + 1);
    }
  };
  useEffect(() => {
    getBlogs();
  }, [page]);
  return (
    <div>
      <div className="flex justify-center items-center h-24">
        {user ? (
          <div>
            <h1>Welcome,{user.name}</h1>

            <Button variant="destructive" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/write">
            <Button>Login</Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-100">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-row gap-16 justify-center items-center">
          {blogs?.data.map((blog, i) => {
            return (
              <Link key={i} to={`/blogs/${blog.objectId}`}>
                <div className="border-2 border-black p-8 ">
                  <p className="text-lg font-bold">{blog.title}</p>
                  <p>{blog.description}</p>
                  <p>{blog.author}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={handlePrev}>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{blogs?.meta.page || 1}</PaginationLink>
          </PaginationItem>
          <PaginationItem onClick={handleNext}>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
export default HomePage;

import GlobalPagination from "@/components/GlobalPagiantion";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useGetPost from "@/hooks/api/post/useGetPost";
import { useLoginStore } from "@/stores/useLogin";
import { parseAsInteger, useQueryState } from "nuqs";
import { Link } from "react-router";
import { useDebounceValue } from "usehooks-ts";

function HomePage() {
  const [page, setPage] = useQueryState<number>(
    "page",
    parseAsInteger.withDefault(0),
  );

  const { user, logout } = useLoginStore();
  const [search, setSearch] = useQueryState("hello", { defaultValue: "" });
  const [debounceSearch] = useDebounceValue(search, 700);
  const { data: blogs, isPending } = useGetPost({
    page,
    search: debounceSearch,
  });

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
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
        <Link to="/write">
          <button>Write</button>
        </Link>
      </div>
      <div className="max-w-2xl mx-auto my-8 ">
        <Input
          placeholder="Search..."
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>

      {isPending ? (
        <div className="flex justify-center items-center h-100">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-row gap-16 justify-center items-center">
          {blogs?.data.map((blog) => {
            return (
              <Link key={blog.slug} to={`/blogs/${blog.slug}`}>
                <div className="border-2 border-black p-8 ">
                  <p className="text-lg font-bold">{blog.title}</p>
                  <p>{blog.description}</p>
                  <p>{blog.user.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {!!blogs?.meta && (
        <GlobalPagination
          currentPage={blogs.meta.page}
          totalPage={Math.ceil(blogs?.meta.total / blogs?.meta.take)}
          onChangePage={(p) => setPage(p)}
        />
      )}
    </div>
  );
}
export default HomePage;

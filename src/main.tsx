import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "./components/ui/sonner";
import "./index.css";
import { authLoader } from "./loaders/auth";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: HomePage } = await import("./pages/HomePage");
      return { Component: HomePage };
    },
  },
  {
    path: "/register",
    lazy: async () => {
      const { default: RegisterPage } = await import("./pages/RegisterPage");
      return { Component: RegisterPage };
    },
  },
  {
    path: "/login",
    lazy: async () => {
      const { default: LoginPage } = await import("./pages/LoginPage");
      return { Component: LoginPage };
    },
  },

  {
    path: "/forgot-password",
    lazy: async () => {
      const { default: ForgotPassword } =
        await import("./pages/ForgotPassword");
      return { Component: ForgotPassword };
    },
  },
  {
    path: "/reset-password",
    lazy: async () => {
      const { default: ResetPassword } = await import("./pages/ResetPassword");
      return { Component: ResetPassword };
    },
  },
  {
    path: "/blogs/:slug",
    lazy: async () => {
      const { default: BlogDetail } = await import("./pages/BlogDetail");
      return { Component: BlogDetail };
    },
  },
  {
    path: "/write",
    lazy: async () => {
      const { default: CreateBlog } = await import("./pages/CreateBlog");
      return { Component: CreateBlog };
    },
    loader: authLoader,
  },
  {
    path: "/change-password",
    lazy: async () => {
      const { default: ChangePassword } =
        await import("./pages/ChangePasswordPage");
      return { Component: ChangePassword };
    },
    loader: authLoader,
  },
  {
    path: "/*",
    lazy: async () => {
      const { default: NotFound } = await import("./pages/NotFound");
      return { Component: NotFound };
    },
  },
]);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <NuqsAdapter>
          <RouterProvider router={router} />
        </NuqsAdapter>

        <Toaster richColors position="top-right"></Toaster>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);

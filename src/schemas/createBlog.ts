import * as z from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  content: z.string().min(1, "Content is required"),
});
export type CreateBlogSchema = z.infer<typeof createBlogSchema>;

export interface Post {
  id: number;
  userId: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  thumbnail: string;
  content: string;
  createAt: Date;
  updateTime: Date;
  user: {
    name: string;
  };
}

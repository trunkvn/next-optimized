import { apiClient, fetcher } from "@/lib/api-client";
import { cache } from "react";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const PostService = {
  getPosts: cache(async (): Promise<Post[]> => {
    // Giả lập delay 1.5s để thấy rõ waterfall
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return apiClient<Post[]>("/posts");
  }),

  getPostsNoCache: async (): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return apiClient<Post[]>("/posts?nocache=1");
  },
};

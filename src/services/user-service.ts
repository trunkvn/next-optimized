import { apiClient } from "@/lib/api-client";
import { User } from "@/types/api";
import { cache } from "react";

export const UserService = {
  /**
   * Fetch all users
   * react-cache: Deduplicate requests within a single server rendering pass
   */
  getUsers: cache(async (): Promise<User[]> => {
    // Giả lập delay 1.5s
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return apiClient<User[]>("/users");
  }),

  // Bản No-cache để demo Waterfall
  getUsersNoCache: async (): Promise<User[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return apiClient<User[]>("/users?nocache=1");
  },

  /**
   * Fetch a single user by ID
   */
  getUserById: async (id: string | number): Promise<User> => {
    return apiClient<User>(`/users/${id}`);
  },

  /**
   * Update user info
   */
  updateUser: async (id: string | number, data: Partial<User>): Promise<User> => {
    return apiClient<User>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },
};

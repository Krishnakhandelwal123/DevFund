import { create } from "zustand";
import { axiosInstance } from "../lib/Axios.js";

export const useCreatorStore = create((set) => ({
  creatorStats: null,
  isLoading: false,
  error: null,

  fetchCreatorStats: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/creator/profile");
      set({
        creatorStats: {
          supportersCount: res.data.supportersCount ?? 0,
          totalEarnings: res.data.totalEarnings ?? 0,
          totalPostsShared: res.data.totalPostsShared ?? 0,
          createdAt: res.data.createdAt,
          updatedAt: res.data.updatedAt
        }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching creator stats:", error);
      set({
        error: error.response?.data?.message || "Failed to load creator stats",
        creatorStats: null
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  clearCreatorStats: () => set({ creatorStats: null, error: null })
}));


import { create } from "zustand";
import { axiosInstance } from "../lib/Axios.js";

export const useSupporterStore = create((set) => ({
  supporterProfile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/supporter/profile");
      set({
        supporterProfile: {
          totalAmountFunded: res.data.totalAmountFunded ?? 0,
          numberOfCreatorsFunded: res.data.numberOfCreatorsFunded ?? 0,
          projectsSupported: res.data.projectsSupported ?? 0,
          createdAt: res.data.createdAt,
          updatedAt: res.data.updatedAt,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching supporter profile:", error);
      set({
        error: error.response?.data?.message || "Failed to load supporter profile",
        supporterProfile: null,
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  clearProfile: () => set({ supporterProfile: null, error: null }),
}));

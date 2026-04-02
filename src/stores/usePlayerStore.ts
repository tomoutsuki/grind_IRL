import { create } from "zustand";

interface PlayerStoreState {
  totalEffort: number;
  level: number;
  completedTaskIds: string[];
  addEffort: (effort: number) => void;
  registerCompletedTask: (taskId: string) => void;
  resetPlayer: () => void;
}

const calculateLevel = (totalEffort: number): number => {
  return Math.floor(Math.max(totalEffort, 0) / 100) + 1;
};

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  totalEffort: 0,
  level: 1,
  completedTaskIds: [],
  addEffort: (effort) => {
    set((state) => {
      const nextEffort = state.totalEffort + Math.max(effort, 0);
      return { totalEffort: nextEffort, level: calculateLevel(nextEffort) };
    });
  },
  registerCompletedTask: (taskId) => {
    set((state) => {
      if (state.completedTaskIds.includes(taskId)) return state;
      return { completedTaskIds: [...state.completedTaskIds, taskId] };
    });
  },
  resetPlayer: () => {
    set({ totalEffort: 0, level: 1, completedTaskIds: [] });
  },
}));

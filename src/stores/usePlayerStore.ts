import { create } from "zustand";
import { DropResult } from "../domain/types";

interface PlayerProgressState {
  totalEffort: number;
  level: number;
  completedTaskIds: string[];
  craftedItems: Record<string, number>;
}

interface PlayerStoreState {
  totalEffort: number;
  level: number;
  completedTaskIds: string[];
  craftedItems: Record<string, number>;
  recentDrops: DropResult[];
  addEffort: (effort: number) => void;
  registerCompletedTask: (taskId: string) => void;
  registerCraftedItem: (itemId: string, quantity: number) => void;
  recordDrops: (drops: DropResult[]) => void;
  setPlayerProgress: (state: Partial<PlayerProgressState>) => void;
  resetPlayer: () => void;
}

const calculateLevel = (totalEffort: number): number => {
  return Math.floor(Math.max(totalEffort, 0) / 100) + 1;
};

export const usePlayerStore = create<PlayerStoreState>((set) => ({
  totalEffort: 0,
  level: 1,
  completedTaskIds: [],
  craftedItems: {},
  recentDrops: [],
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
  registerCraftedItem: (itemId, quantity) => {
    if (quantity <= 0) return;
    set((state) => ({
      craftedItems: {
        ...state.craftedItems,
        [itemId]: (state.craftedItems[itemId] ?? 0) + quantity,
      },
    }));
  },
  recordDrops: (drops) => {
    if (drops.length === 0) return;
    set((state) => ({ recentDrops: [...drops, ...state.recentDrops].slice(0, 10) }));
  },
  setPlayerProgress: (nextState) => {
    set((state) => ({
      totalEffort: nextState.totalEffort ?? state.totalEffort,
      level: nextState.level ?? state.level,
      completedTaskIds: nextState.completedTaskIds ?? state.completedTaskIds,
      craftedItems: nextState.craftedItems ?? state.craftedItems,
    }));
  },
  resetPlayer: () => {
    set({
      totalEffort: 0,
      level: 1,
      completedTaskIds: [],
      craftedItems: {},
      recentDrops: [],
    });
  },
}));

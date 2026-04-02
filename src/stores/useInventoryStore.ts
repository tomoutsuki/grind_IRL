import { create } from "zustand";
import { DropResult, InventoryItem, InventoryState } from "../domain/types";
import {
  addDropsToInventory,
  addItemToInventory,
  consumeItem,
  hasRequiredItems,
  toInventoryItems,
} from "../engines/inventoryEngine";

interface InventoryStoreState {
  inventory: InventoryState;
  addItem: (itemId: string, quantity?: number) => void;
  addDrops: (drops: DropResult[]) => void;
  removeItem: (itemId: string, quantity?: number) => boolean;
  hasItems: (required: InventoryItem[]) => boolean;
  toItems: () => InventoryItem[];
  resetInventory: () => void;
}

export const useInventoryStore = create<InventoryStoreState>((set, get) => ({
  inventory: {},
  addItem: (itemId, quantity = 1) => {
    set((state) => ({ inventory: addItemToInventory(state.inventory, itemId, quantity) }));
  },
  addDrops: (drops) => {
    set((state) => ({ inventory: addDropsToInventory(state.inventory, drops) }));
  },
  removeItem: (itemId, quantity = 1) => {
    let success = false;
    set((state) => {
      const next = consumeItem(state.inventory, itemId, quantity);
      success = next.success;
      return { inventory: next.inventory };
    });
    return success;
  },
  hasItems: (required) => {
    return hasRequiredItems(get().inventory, required);
  },
  toItems: () => {
    return toInventoryItems(get().inventory);
  },
  resetInventory: () => set({ inventory: {} }),
}));

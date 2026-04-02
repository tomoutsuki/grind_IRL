import { create } from "zustand";
import { DropResult, InventoryItem, InventoryState } from "../domain/types";
import {
  addDropsToInventory,
  addItemToInventory,
  consumeItem,
  hasRequiredItems,
  toInventoryItems,
} from "../engines/inventoryEngine";
import { applyCraftPlan, buildCraftPlan, CraftPlan } from "../engines/craftingEngine";
import { Recipe } from "../domain/types";
import { usePlayerStore } from "./usePlayerStore";
import { openCrateInInventory, OpenCrateResult } from "../game/crateEngine";
import { CRATE_DEFINITIONS } from "../data/crateDropTables";

interface InventoryStoreState {
  inventory: InventoryState;
  addItem: (itemId: string, quantity?: number) => void;
  addDrops: (drops: DropResult[]) => void;
  removeItem: (itemId: string, quantity?: number) => boolean;
  openCrate: (crateItemId: string, rng?: () => number) => OpenCrateResult;
  craftRecipe: (recipeId: string, recipes: Recipe[], times?: number) => CraftPlan;
  getCraftPlan: (recipeId: string, recipes: Recipe[], times?: number) => CraftPlan;
  hasItems: (required: InventoryItem[]) => boolean;
  setInventory: (inventory: InventoryState) => void;
  getQuantity: (itemId: string) => number;
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
    usePlayerStore.getState().recordDrops(drops);
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
  openCrate: (crateItemId, rng = Math.random) => {
    let result: OpenCrateResult = {
      success: false,
      drops: [],
      inventoryAfter: get().inventory,
      reason: "crate-open-failed",
    };
    set((state) => {
      result = openCrateInInventory(state.inventory, crateItemId, CRATE_DEFINITIONS, rng);
      return { inventory: result.inventoryAfter };
    });
    if (result.success) usePlayerStore.getState().recordDrops(result.drops);
    return result;
  },
  craftRecipe: (recipeId, recipes, times = 1) => {
    let plan: CraftPlan = {
      craftable: false,
      steps: [],
      missing: [],
      inventoryAfter: get().inventory,
    };
    set((state) => {
      plan = buildCraftPlan(recipeId, recipes, state.inventory, times);
      if (!plan.craftable) return state;
      const root = recipes.find((recipe) => recipe.id === recipeId);
      if (root) {
        const craftedQty = root.output.quantity * times;
        usePlayerStore.getState().registerCraftedItem(root.output.itemId, craftedQty);
      }
      return { inventory: applyCraftPlan(plan, state.inventory) };
    });
    return plan;
  },
  getCraftPlan: (recipeId, recipes, times = 1) => {
    return buildCraftPlan(recipeId, recipes, get().inventory, times);
  },
  hasItems: (required) => {
    return hasRequiredItems(get().inventory, required);
  },
  setInventory: (inventory) => set({ inventory }),
  getQuantity: (itemId) => get().inventory[itemId] ?? 0,
  toItems: () => {
    return toInventoryItems(get().inventory);
  },
  resetInventory: () => set({ inventory: {} }),
}));
